import styles from "./HelloWord.module.css";
import greeting from "@/lib/mock/render-centered-hello-word";

export default function HelloWord() {
  return <main aria-label="Hello Word" className={styles.helloWord}>{greeting.greeting_text}</main>;
}
