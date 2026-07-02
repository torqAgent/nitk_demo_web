"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./TopTabs.module.css";

const TABS = [
  { label: "Books", href: "/books" },
  { label: "Home", href: "/" },
  { label: "Papers", href: "/papers" },
];

export default function TopTabs() {
  const pathname = usePathname();

  return (
    <nav className={styles.tabs} aria-label="Browse the collection">
      {TABS.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`${styles.tab} ${active ? styles.tabActive : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}