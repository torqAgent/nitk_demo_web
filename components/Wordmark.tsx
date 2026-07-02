import styles from "./Wordmark.module.css";

export default function Wordmark({ text }: { text: string }) {
  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <h1 className={styles.wordmark} aria-label={text}>
      {words.map((word, wi) => (
        <span className={styles.word} key={wi} aria-hidden="true">
          {word.split("").map((ch, ci) => {
            const delay = globalIndex * 34;
            globalIndex += 1;
            return (
              <span
                className={styles.letter}
                key={ci}
                style={{ animationDelay: `${delay}ms` }}
              >
                {ch}
              </span>
            );
          })}
          {wi < words.length - 1 ? <span className={styles.space}>&nbsp;</span> : null}
        </span>
      ))}
    </h1>
  );
}