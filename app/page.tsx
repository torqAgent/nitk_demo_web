import Link from "next/link";
import ScatteredBoard from "@/components/ScatteredBoard";
import TopTabs from "@/components/TopTabs";
import Wordmark from "@/components/Wordmark";
import styles from "./page.module.css";

export const metadata = {
  title: "NITK Library — Central Library",
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.vignette} aria-hidden="true" />
      <ScatteredBoard filter="all" />

      <div className={styles.content}>
        <TopTabs />

        <div className={styles.hero}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowRule} />
            Estd. 1960 · Surathkal, Karnataka
            <span className={styles.eyebrowRule} />
          </p>

          <Wordmark text="NITK Library" />

          <p className={styles.tagline}>
            Central Library · National Institute of Technology Karnataka
          </p>

          <div className={styles.actions}>
            <Link href="/voice" className={styles.voiceButton}>
              <span className={styles.dot} aria-hidden="true" />
              Talk to Ritu
            </Link>
            <Link href="/chat" className={styles.chatLink}>
              Ask Aria
              <span className={styles.chatArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <p className={styles.hint}>
            Ritu answers out loud at the entrance kiosk. Aria types back here — find
            databases, locate a section, or check hours and services.
          </p>
        </div>
      </div>
    </main>
  );
}