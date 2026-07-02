"use client";

import CardList from "@/components/CardList";
import TopTabs from "@/components/TopTabs";
import { CardKind } from "@/lib/cards";
import styles from "./CollectionPage.module.css";

const COPY: Record<CardKind, { heading: string; tagline: string; hint: string }> = {
  book: {
    heading: "Books",
    tagline: "First Floor · Stacks",
    hint: "A sample of titles held in the general stacks. Ask Ritu or Aria for the exact shelf and availability.",
  },
  paper: {
    heading: "Papers",
    tagline: "Journals · Databases · Preprints",
    hint: "A sample of papers and journals available through the library's subscriptions. Ask Ritu or Aria to search a specific database.",
  },
};

export default function CollectionPage({ kind }: { kind: CardKind }) {
  const copy = COPY[kind];

  return (
    <main className={styles.main}>
      <div className={styles.topBar}>
        <TopTabs />
      </div>

      <div className={styles.intro}>
        <h1 className={styles.heading}>{copy.heading}</h1>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.tagline}>{copy.tagline}</p>
        <p className={styles.hint}>{copy.hint}</p>
      </div>

      <CardList filter={kind} />
    </main>
  );
}