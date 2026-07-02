"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Track } from "livekit-client";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
  useVoiceAssistant,
  useLocalParticipant,
  useTranscriptions,
  useRoomContext,
  BarVisualizer,
  TrackToggle,
} from "@livekit/components-react";
import styles from "./VoiceRoom.module.css";

type TokenResponse = { token: string; serverUrl: string; roomName: string };

export default function VoiceRoom() {
  const router = useRouter();
  const [session, setSession] = useState<TokenResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "connecting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const begin = useCallback(async () => {
    setStatus("connecting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/token", { method: "POST" });
      if (!res.ok) throw new Error((await res.json()).error ?? "Could not start the call.");
      const data: TokenResponse = await res.json();
      setSession(data);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message ?? "Something went wrong.");
    }
  }, []);

  if (!session) {
    return (
      <main className={styles.gate}>
        <Link href="/" className={styles.back}>
          ← NITK Library
        </Link>
        <div className={styles.gateInner}>
          <p className={styles.eyebrow}>Voice</p>
          <h1 className={styles.gateTitle}>Talk to Ritu</h1>
          <p className={styles.gateBody}>
            Ritu is the library&apos;s voice guide, the same one on the entrance kiosk. Ask about
            databases for your subject, library hours, or where to find a section — she&apos;ll
            answer out loud.
          </p>
          <button className={styles.startButton} onClick={begin} disabled={status === "connecting"}>
            {status === "connecting" ? "Connecting…" : "Begin conversation"}
          </button>
          {status === "error" && <p className={styles.error}>{errorMsg}</p>}
          <p className={styles.gateHint}>Uses your microphone. You can leave the call any time.</p>
        </div>
      </main>
    );
  }

  return (
    <LiveKitRoom
      token={session.token}
      serverUrl={session.serverUrl}
      connect
      audio
      video={false}
      onDisconnected={() => router.push("/")}
      className={styles.room}
    >
      <RoomAudioRenderer />
      <StartAudio label="Click to enable Ritu's voice" />
      <CallStage />
    </LiveKitRoom>
  );
}

function CallStage() {
  const { state, audioTrack } = useVoiceAssistant();
  const { localParticipant } = useLocalParticipant();
  const transcriptions = useTranscriptions();

  const captions = transcriptions
    .filter((t) => t.text?.trim())
    .slice(-6)
    .map((t) => ({
      id: `${t.participantInfo.identity}-${t.streamInfo.id}`,
      speaker: t.participantInfo.identity === localParticipant.identity ? "You" : "Ritu",
      text: t.text,
    }));

  const stateLabel: Record<string, string> = {
    connecting: "Connecting",
    initializing: "Connecting",
    listening: "Listening",
    thinking: "Thinking",
    speaking: "Speaking",
    disconnected: "Disconnected",
  };

  return (
    <main className={styles.stage}>
      <Link href="/" className={styles.back}>
        ← NITK Library
      </Link>

      <div className={styles.stageInner}>
        <p className={styles.eyebrow}>Ritu · Library Voice Guide</p>
        <p className={styles.stateLabel}>{stateLabel[state] ?? "Connecting"}</p>

        <div className={styles.visualizerWrap}>
          <BarVisualizer state={state} barCount={7} track={audioTrack} className={styles.visualizer} />
        </div>

        <div className={styles.captions}>
          {captions.length === 0 && <p className={styles.captionPlaceholder}>Say hello to begin.</p>}
          {captions.map((c) => (
            <p key={c.id} className={styles.captionLine}>
              <span className={styles.captionSpeaker}>{c.speaker}</span>
              {c.text}
            </p>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <TrackToggle source={Track.Source.Microphone} className={styles.micToggle} />
        <LeaveButton />
      </div>
    </main>
  );
}

function LeaveButton() {
  const room = useRoomContext();
  return (
    <button
      className={styles.leaveButton}
      onClick={() => {
        room.disconnect();
      }}
    >
      End conversation
    </button>
  );
}