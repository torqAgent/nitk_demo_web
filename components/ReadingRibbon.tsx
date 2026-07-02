"use client";

import { useEffect, useRef } from "react";
import styles from "./ReadingRibbon.module.css";

// A silk bookmark ribbon pinned to the top of the viewport that descends as
// you read down the page — a scroll marker, not a cursor gimmick. Only
// visible (opacity 1) on pages tall enough to actually scroll.
export default function ReadingRibbon() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 40 ? Math.min(1, Math.max(0, doc.scrollTop / scrollable)) : 0;
      el.style.setProperty("--progress", progress.toFixed(4));
      el.style.opacity = scrollable > 40 ? "1" : "0";
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={styles.ribbon} aria-hidden="true">
      <span className={styles.thread} />
      <span className={styles.tassel} />
    </div>
  );
}