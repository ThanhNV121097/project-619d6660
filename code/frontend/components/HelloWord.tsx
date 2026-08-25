import greeting from "@/lib/mock/render-centered-hello-word";

export default function HelloWord() {
  return <main aria-label="Hello Word" className="hello-word">{greeting.greeting_text}</main>;
}
