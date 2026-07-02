import { NextRequest } from "next/server";
import { buildAriaSystemPrompt, ARIA_TOOLS } from "@/lib/ariaPersona";
import { searchDatabases, getLibraryInfo } from "@/lib/knowledge";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

function runTool(name: string, args: Record<string, unknown>) {
  if (name === "search_databases") return searchDatabases(String(args.subject ?? ""));
  if (name === "get_library_info") return getLibraryInfo(String(args.topic ?? ""));
  return { error: `Unknown tool ${name}` };
}

async function callDeepSeek(apiKey: string, messages: any[], stream: boolean) {
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      tools: ARIA_TOOLS,
      stream,
      temperature: 0.4,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DeepSeek error ${res.status}: ${text}`);
  }
  return res;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return new Response("Aria is not configured on the server. Set DEEPSEEK_API_KEY.", { status: 500 });
  }

  const { messages }: { messages: ChatMessage[] } = await req.json();
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Missing messages.", { status: 400 });
  }

  const conversation: any[] = [
    { role: "system", content: buildAriaSystemPrompt() },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  try {
    // First pass, non-streaming: lets us see tool calls before committing
    // to a stream, and resolve them against the local knowledge base.
    const first = await callDeepSeek(apiKey, conversation, false);
    const firstJson = await first.json();
    const choice = firstJson.choices?.[0];
    const assistantMsg = choice?.message;

    let finalText: string;

    if (assistantMsg?.tool_calls?.length) {
      conversation.push(assistantMsg);
      for (const call of assistantMsg.tool_calls) {
        let args: Record<string, unknown> = {};
        try {
          args = JSON.parse(call.function.arguments || "{}");
        } catch {
          /* leave empty */
        }
        const result = runTool(call.function.name, args);
        conversation.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify(result),
        });
      }

      const second = await callDeepSeek(apiKey, conversation, false);
      const secondJson = await second.json();
      finalText = secondJson.choices?.[0]?.message?.content ?? "";
    } else {
      finalText = assistantMsg?.content ?? "";
    }

    if (!finalText) {
      finalText = "I couldn't find an answer to that. Try asking about hours, databases, or a specific subject.";
    }

    // Stream the resolved answer back to the client in small chunks so the
    // UI can render it progressively, without needing token-level streaming
    // from the upstream tool-calling round trip.
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const chunkSize = 6;
        for (let i = 0; i < finalText.length; i += chunkSize) {
          controller.enqueue(encoder.encode(finalText.slice(i, i + chunkSize)));
          await new Promise((r) => setTimeout(r, 12));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    return new Response(`Aria hit an error reaching DeepSeek: ${err.message}`, { status: 502 });
  }
}
