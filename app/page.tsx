import Link from "next/link";
import ScatteredBoard from "@/components/ScatteredBoard";
import TopTabs from "@/components/TopTabs";
import styles from "./page.module.css";

export const metadata = {
  title: "NITK Library — Central Library",
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <ScatteredBoard filter="all" />

      <div className={styles.content}>
        <TopTabs />

        <div className={styles.hero}>
          <h1 className={styles.wordmark}>NITK Library</h1>
          <p className={styles.tagline}>
            Central Library · National Institute of Technology Karnataka, Surathkal
          </p>

          <div className={styles.actions}>
            <Link href="/voice" className={styles.voiceButton}>
              <span className={styles.dot} aria-hidden="true" />
              Voice
            </Link>
            <Link href="/chat" className={styles.chatButton}>
              <span className={styles.star} aria-hidden="true">
                ✶
              </span>
              Chat
            </Link>
          </div>

          <p className={styles.hint}>
            Talk to Ritu at the entrance kiosk, or ask Aria here — find databases, locate a
            section, or check hours and services.
          </p>
        </div>
      </div>
    </main>
  );
}