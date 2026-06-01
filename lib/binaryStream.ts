export function bitAt(index: number): "0" | "1" {
  return ((index * 1103515245 + 12345) >>> 0) % 2 === 0 ? "0" : "1";
}

export function binaryPadding(length: number, seed: number): string {
  let out = "";
  for (let i = 0; i < length; i++) out += bitAt(seed + i);
  return out;
}

export function paddingForText(
  text: string,
  cols: number,
  seed: number,
): { left: string; right: string } {
  if (cols <= 0) return { left: "", right: "" };
  const gap = Math.max(0, cols - text.length);
  const leftLen = gap > 0 ? (seed * 13) % (gap + 1) : 0;
  const rightLen = gap - leftLen;
  return {
    left: binaryPadding(leftLen, seed),
    right: binaryPadding(rightLen, seed + 1000),
  };
}

export function pureBinaryLine(cols: number, lineSeed: number): string {
  return binaryPadding(cols, lineSeed * 97);
}
