"use client";

import { useEffect, useState } from "react";

import styles from "./HelloWord.module.css";

type GreetingResponse = {
  greeting_text: string;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export default function HelloWord() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiBase}/v1/greeting`, { cache: "no-store", signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to load greeting");
        }
        return response.json() as Promise<GreetingResponse>;
      })
      .then((data) => setGreeting(data.greeting_text))
      .catch(() => {
        controller.abort();
      });

    return () => controller.abort();
  }, []);

  return <div className={styles.helloWord}>{greeting}</div>;
}

