"use client";

import {
  ElementType,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type DecodeTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms before this element starts decoding */
  delay?: number;
  /** ms between each character locking into place */
  perChar?: number;
};

export default function DecodeText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  perChar = 38,
}: DecodeTextProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    let start: number | null = null;

    const scramble = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;

      let out = "";
      let done = true;

      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || ch === "\n") {
          out += ch;
          continue;
        }
        const revealAt = delay + i * perChar;
        if (elapsed >= revealAt) {
          out += ch;
        } else {
          out += Math.random() < 0.5 ? "0" : "1";
          done = false;
        }
      }

      setDisplay(out);
      if (!done) {
        frameRef.current = requestAnimationFrame(scramble);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(scramble);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, perChar]);

  return (
    <Tag className={className} data-decode="">
      {display}
    </Tag>
  );
}
