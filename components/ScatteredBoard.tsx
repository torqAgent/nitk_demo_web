"use client";

import { CARDS, CardKind } from "@/lib/cards";
import styles from "./ScatteredBoard.module.css";

// Percentage-based rectangle that covers the centered hero content
// (top tabs, wordmark, tagline, CTAs, hint text). Any card whose anchor
// point falls inside here gets pushed out to the nearest edge instead.
const SAFE_ZONE = { top: 14, bottom: 90, left: 28, right: 72 };
const PUSH_OUT_GAP = 9;
const VIEWPORT_MARGIN = 3;

function keepOutOfHero(top: number, left: number) {
  const insideVertically = top > SAFE_ZONE.top && top < SAFE_ZONE.bottom;
  const insideHorizontally = left > SAFE_ZONE.left && left < SAFE_ZONE.right;

  if (!(insideVertically && insideHorizontally)) {
    return { top, left };
  }

  const distanceToEdge = {
    left: left - SAFE_ZONE.left,
    right: SAFE_ZONE.right - left,
    top: top - SAFE_ZONE.top,
    bottom: SAFE_ZONE.bottom - top,
  };

  const nearestEdge = (Object.keys(distanceToEdge) as (keyof typeof distanceToEdge)[]).reduce((a, b) =>
    distanceToEdge[a] < distanceToEdge[b] ? a : b
  );

  switch (nearestEdge) {
    case "left":
      return { top, left: Math.max(VIEWPORT_MARGIN, SAFE_ZONE.left - PUSH_OUT_GAP) };
    case "right":
      return { top, left: Math.min(97, SAFE_ZONE.right + PUSH_OUT_GAP) };
    case "top":
      return { top: Math.max(VIEWPORT_MARGIN, SAFE_ZONE.top - PUSH_OUT_GAP), left };
    default:
      return { top: Math.min(95, SAFE_ZONE.bottom + PUSH_OUT_GAP), left };
  }
}

export default function ScatteredBoard({ filter }: { filter: CardKind | "all" }) {
  const visible = filter === "all" ? CARDS : CARDS.filter((c) => c.kind === filter);

  return (
    <div className={styles.board} aria-hidden="true">
      {visible.map((card) => {
        const { top, left } = keepOutOfHero(card.top, card.left);
        return (
          <article
            key={card.id}
            className={styles.card}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${card.width}px`,
              transform: `rotate(${card.rotate}deg)`,
            }}
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