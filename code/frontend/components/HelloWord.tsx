import styles from "./HelloWord.module.css";
import greeting from "../lib/mock/render-centered-hello-word";

export default function HelloWord() {
  return <div className={styles.helloWord}>{greeting.greeting_text}</div>;
}
