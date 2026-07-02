# NITK Library — Website

Frontend for the NITK Central Library kiosk project. Pairs with the existing
`agent.py` / `persona.py` / `tools.py` LiveKit agent (Ritu) unchanged — this
repo doesn't touch that code, it just gives it a front door, plus a separate
text assistant (Aria) that answers the same questions without a voice call.

Built with Next.js 14 (App Router), deployed as a normal serverless Next.js
app (Vercel or any Node host) — no standalone backend server to run.

## How it's wired

**Voice (Ritu).** `/voice` connects to a LiveKit room through the browser
client SDK. The only server-side work is `app/api/token/route.ts`, a
serverless function that mints a short-lived LiveKit access token and embeds
an explicit agent dispatch (`RoomConfiguration` → `RoomAgentDispatch` with
`agentName: "nitk-library-agent"`) directly in the token. That's what causes
your `agent.py` worker — already registered under that same agent name — to
be dispatched into the room the instant it's created. The browser never
touches `LIVEKIT_API_SECRET`; it only receives the signed token.

Your `agent.py` worker keeps running exactly as it does today (`uv run
agent.py start`), pointed at the same LiveKit project. Nothing in this repo
replaces or duplicates the voice pipeline (Sarvam STT/TTS, DeepSeek, Silero
VAD) — it only opens the room and lets the existing worker join it.

**Text (Aria).** `/chat` never touches LiveKit. It posts to
`app/api/chat/route.ts`, a serverless function that calls the DeepSeek chat
completions API directly with `DEEPSEEK_API_KEY`. Aria uses the same
knowledge base as Ritu — `lib/knowledge.ts` is a direct TypeScript port of
`tools.py`'s `search_databases` and `get_library_info`, wired up as DeepSeek
function-calling tools (`lib/ariaPersona.ts`) so the two channels give
consistent answers. If the library's static knowledge base changes in
`tools.py`, mirror the change in `lib/knowledge.ts`.

## Environment variables

Only the four keys already in use — set these wherever the app is deployed
(e.g. Vercel project settings), never committed:

```
LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
DEEPSEEK_API_KEY=
```

All four are read server-side only (`app/api/*/route.ts`, `runtime =
"nodejs"`). None are exposed to the browser bundle.

## Project structure

```
app/
  page.tsx              Home — scattered card board, Books/Home/Papers tabs, Voice/Chat entry
  voice/page.tsx         Voice call route
  chat/page.tsx          Aria chat route
  api/token/route.ts      Mints LiveKit token + embeds agent dispatch
  api/chat/route.ts       Calls DeepSeek directly, resolves tool calls, streams reply
components/
  ScatteredBoard.tsx      Home page card board
  VoiceRoom.tsx            LiveKit room UI: connect gate, live captions, bar visualizer, mic toggle
  ChatWindow.tsx           Aria chat UI: streamed replies, suggestion chips
lib/
  cards.ts                 Content for the scattered board
  knowledge.ts              TypeScript port of tools.py's static knowledge base
  ariaPersona.ts             Aria's system prompt + DeepSeek tool schemas
```

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in the four keys
npm run dev
```

Run your existing agent worker separately, pointed at the same LiveKit
project, so it's live to receive the dispatch:

```bash
uv run agent.py start
```

## Deploying

Any Node-compatible serverless host works (Vercel is the path of least
resistance for Next.js). Set the four environment variables in the host's
dashboard, then:

```bash
npm run build
npm run start
```

The agent worker (`agent.py`) is deployed and run separately — it's a
long-running LiveKit Agents worker, not a serverless function, and isn't
part of this Next.js project.
