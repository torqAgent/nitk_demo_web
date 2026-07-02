import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";
import { RoomAgentDispatch, RoomConfiguration } from "@livekit/protocol";

export const runtime = "nodejs";

const AGENT_NAME = "nitk-library-agent";

function randomId(len = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function POST(req: NextRequest) {
  const { LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = process.env;

  if (!LIVEKIT_URL || !LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
    return NextResponse.json(
      { error: "LiveKit is not configured on the server. Set LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET." },
      { status: 500 },
    );
  }

  const roomName = `nitk-library-${randomId()}`;
  const identity = `visitor-${randomId(6)}`;

  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity,
    ttl: "10m",
  });

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  // Explicit agent dispatch: this room configuration is what launches the
  // nitk-library-agent worker (agent.py, registered with agent_name
  // "nitk-library-agent") the moment the room is created. Without this the
  // worker never receives the job.
  at.roomConfig = new RoomConfiguration({
    agents: [new RoomAgentDispatch({ agentName: AGENT_NAME })],
  });

  const token = await at.toJwt();

  return NextResponse.json({
    token,
    serverUrl: LIVEKIT_URL,
    roomName,
  });
}
