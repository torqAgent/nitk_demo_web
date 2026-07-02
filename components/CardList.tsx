import { CARDS, CardKind } from "@/lib/cards";
import styles from "./CardList.module.css";

export default function CardList({ filter }: { filter: CardKind | "all" }) {
  const visible = filter === "all" ? CARDS : CARDS.filter((c) => c.kind === filter);

  return (
    <ul className={styles.list} aria-label={filter === "all" ? "All items" : `${filter}s`}>
      {visible.map((card, i) => (
        <li
          key={card.id}
          className={styles.item}
          style={{ "--i": i % 12 } as React.CSSProperties}
        >
          <h3 className={styles.title}>{card.title}</h3>
          <p className={styles.byline}>{card.byline}</p>
          <p className={styles.tag}>{card.tag}</p>
        </li>
      ))}
    </ul>
  );
}