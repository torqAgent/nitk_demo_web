"use client";

import { CARDS, CardKind } from "@/lib/cards";
import styles from "./ScatteredBoard.module.css";

export default function ScatteredBoard({ filter }: { filter: CardKind | "all" }) {
  const visible = filter === "all" ? CARDS : CARDS.filter((c) => c.kind === filter);

  return (
    <div className={styles.board} aria-hidden="true">
      {visible.map((card) => (
        <article
          key={card.id}
          className={styles.card}
          style={{
            top: `${card.top}%`,
            left: `${card.left}%`,
            width: `${card.width}px`,
            transform: `rotate(${card.rotate}deg)`,
          }}
        >
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={styles.cardByline}>{card.byline}</p>
          <p className={styles.cardTag}>{card.tag}</p>
        </article>
      ))}
    </div>
  );
}
