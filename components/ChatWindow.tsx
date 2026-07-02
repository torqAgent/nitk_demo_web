"use client";

import { useRef, useState, FormEvent } from "react";
import Link from "next/link";
import styles from "./ChatWindow.module.css";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Which databases cover machine learning?",
  "What are the library's hours today?",
  "Where do I find the stack area?",
  "How do I access databases from off campus?",
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const nextMessages: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    scrollToEnd();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.body) throw new Error("No response body.");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
        scrollToEnd();
      }
    } catch (err: any) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "I couldn't reach the library system just now. Please try again in a moment.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          ← NITK Library
        </Link>
        <div className={styles.headerTitle}>
          <p className={styles.eyebrow}>Aria · Library Assistant</p>
        </div>
        <span className={styles.spacer} />
      </header>

      <div className={styles.scroll} ref={scrollRef}>
        {messages.length === 0 && (
          <div className={styles.empty}>
            <h1 className={styles.emptyTitle}>Ask Aria</h1>
            <p className={styles.emptyBody}>
              Databases for your subject, library hours, sections, remote access, or any other
              library service.
            </p>
            <div className={styles.suggestions}>
              {SUGGESTIONS.map((s) => (
                <button key={s} className={styles.suggestion} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? styles.userRow : styles.assistantRow}>
            <div className={m.role === "user" ? styles.userBubble : styles.assistantBubble}>
              {m.content || (busy && i === messages.length - 1 ? "…" : "")}
            </div>
          </div>
        ))}
      </div>

      <form className={styles.composer} onSubmit={onSubmit}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about databases, hours, sections…"
          disabled={busy}
        />
        <button className={styles.send} type="submit" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
    </main>
  );
}
