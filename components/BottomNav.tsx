"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui } from "@/lib/ui";

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/me", label: ui.nav.me },
    { href: "/projects", label: ui.nav.projects },
    { href: "/experience", label: ui.nav.experience },
    { href: "/contact", label: ui.nav.contact },
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
