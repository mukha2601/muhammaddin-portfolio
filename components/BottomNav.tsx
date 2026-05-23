"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useT } from "./LangProvider";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useT();

  const links = [
    { href: "/me", label: t.nav.me },
    { href: "/projects", label: t.nav.projects },
    { href: "/experience", label: t.nav.experience },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav className="bottom-nav" aria-label="Navigation">
      <div className="bottom-nav-inner">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`bottom-nav-item ${active ? "active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
