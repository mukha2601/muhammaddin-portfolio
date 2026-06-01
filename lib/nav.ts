export const NAV_SHORTCUTS = [
  { href: "/me", key: "F1" },
  { href: "/projects", key: "F2" },
  { href: "/experience", key: "F3" },
  { href: "/contact", key: "F4" },
  { href: "/settings", key: "F5" },
] as const;

export const NAV_KEYS = NAV_SHORTCUTS.map((item) => item.key);

export function navHrefForKey(key: string): string | undefined {
  return NAV_SHORTCUTS.find((item) => item.key === key)?.href;
}
