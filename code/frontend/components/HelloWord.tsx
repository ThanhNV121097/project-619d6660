import styles from "./HelloWord.module.css";

type GreetingResponse = {
  greeting_text: string;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export default async function HelloWord() {
  const response = await fetch(`${apiBase}/v1/greeting`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("failed to load greeting");
  }

  const greeting = (await response.json()) as GreetingResponse;

  return <div className={styles.helloWord}>{greeting.greeting_text}</div>;
}
