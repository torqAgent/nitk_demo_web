"use client";

import { useMemo, useEffect, useState } from "react";
import { CARDS, CardKind } from "@/lib/cards";
import styles from "./ScatteredBoard.module.css";

const SAFE_ZONE = { left: 25, right: 75 };

export default function ScatteredBoard({ filter }: { filter: CardKind | "all" }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const visibleCards = useMemo(() => {
    const list = filter === "all" ? CARDS : CARDS.filter((c) => c.kind === filter);
    return list.map((card) => {
      let { left } = card;
      // Force cards out of the center[cite: 11]
      if (left > SAFE_ZONE.left && left < SAFE_ZONE.right) {
        left = left > 50 ? SAFE_ZONE.right + 2 : SAFE_ZONE.left - 2;
      }
      return { ...card, left };
    });
  }, [filter]);

  if (!isClient) return <div className={styles.board} aria-hidden="true" />;

  return (
    <div className={styles.board} aria-hidden="true" suppressHydrationWarning>
      {visibleCards.map((card, i) => {
        // Pin to the outer edge based on position[cite: 11]
        const pinLeft = card.left <= 50;

        return (
          <article
            key={card.id}
            className={styles.card}
            style={{
              top: `${card.top}%`,
              [pinLeft ? "left" : "right"]: `${pinLeft ? card.left : 100 - card.left}%`,
              "--card-max-width": `${card.width}px`,
              "--card-rotate": `${card.rotate}deg`,
              "--in-delay": `${(i % 8) * 60}ms`,
            } as React.CSSProperties}
          >
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardByline}>{card.byline}</p>
            <p className={styles.cardTag}>{card.tag}</p>
          </article>
        );
      })}
    </div>
  );
}