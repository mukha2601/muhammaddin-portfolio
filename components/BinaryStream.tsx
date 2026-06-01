"use client";

import DecodeText from "@/components/DecodeText";
import {
  binaryPadding,
  paddingForText,
  pureBinaryLine,
} from "@/lib/binaryStream";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const ColsContext = createContext(72);

const CHAR_WIDTH = 8.4;

export function BinaryStream({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(72);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const width = el.clientWidth;
      setCols(Math.max(32, Math.floor(width / CHAR_WIDTH)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <ColsContext.Provider value={cols}>
      <div ref={ref} className="binary-stream">
        {children}
      </div>
    </ColsContext.Provider>
  );
}

export function BinaryFill({ lines = 2 }: { lines?: number }) {
  const cols = useContext(ColsContext);
  return (
    <>
      {Array.from({ length: lines }, (_, i) => (
        <BinaryLineRaw key={i} content={pureBinaryLine(cols, i + 1)} />
      ))}
    </>
  );
}

type BinaryLineProps = {
  text: string;
  seed?: number;
  href?: string;
  download?: boolean;
  decode?: boolean;
  className?: string;
};

export function BinaryLine({
  text,
  seed = 0,
  href,
  download,
  decode = true,
  className,
}: BinaryLineProps) {
  const cols = useContext(ColsContext);
  const { left, right } = paddingForText(text, cols, seed);

  const textNode = decode ? (
    <DecodeText text={text} className="binary-text" />
  ) : (
    <span className="binary-text">{text}</span>
  );

  return (
    <div className={`binary-line ${className ?? ""}`.trim()}>
      <span className="binary-bit">{left}</span>
      {href ? (
        <a
          href={href}
          className="binary-text-link"
          {...(download ? { download: true } : {})}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {textNode}
        </a>
      ) : (
        textNode
      )}
      <span className="binary-bit">{right}</span>
    </div>
  );
}

function BinaryBits({ value }: { value: string }) {
  return (
    <>
      {[...value].map((ch, i) => (
        <span key={i} className="binary-bit">
          {ch}
        </span>
      ))}
    </>
  );
}

function BinaryLineRaw({ content }: { content: string }) {
  return (
    <div className="binary-line">
      <BinaryBits value={content} />
    </div>
  );
}

/** Multiple text chunks on one row, separated by binary padding */
export function BinaryLineGroup({
  parts,
  seed = 0,
  decode = true,
}: {
  parts: string[];
  seed?: number;
  decode?: boolean;
}) {
  const cols = useContext(ColsContext);
  const combined = parts.join("");
  const totalTextLen = combined.length;
  const totalGap = Math.max(0, cols - totalTextLen);
  const gapsBetween = Math.max(0, parts.length - 1);
  const innerGapBudget = Math.min(totalGap, gapsBetween * 4);
  const outerGap = totalGap - innerGapBudget;

  let leftOuter = 0;
  if (outerGap > 0) leftOuter = (seed * 11) % (outerGap + 1);
  const rightOuter = outerGap - leftOuter;

  const innerPad =
    gapsBetween > 0 ? Math.floor(innerGapBudget / gapsBetween) : 0;

  return (
    <div className="binary-line">
      <span className="binary-bit">{binaryPadding(leftOuter, seed)}</span>
      {parts.map((part, i) => (
        <span key={i} className="binary-line-part">
          {decode ? (
            <DecodeText text={part} className="binary-text" />
          ) : (
            <span className="binary-text">{part}</span>
          )}
          {i < parts.length - 1 ? (
            <span className="binary-bit">
              {binaryPadding(innerPad, seed + i * 31)}
            </span>
          ) : null}
        </span>
      ))}
      <span className="binary-bit">{binaryPadding(rightOuter, seed + 500)}</span>
    </div>
  );
}
