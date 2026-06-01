"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TerminalStatus from "./TerminalStatus";
import { ui } from "@/lib/ui";
import { NAV_SHORTCUTS } from "@/lib/nav";

export default function TerminalChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { href: "/me", label: ui.nav.me },
    { href: "/projects", label: ui.nav.projects },
    { href: "/experience", label: ui.nav.experience },
    { href: "/contact", label: ui.nav.contact },
    { href: "/settings", label: ui.nav.settings },
  ];

  return (
    <div className="crt-screen">
      <div className="term-window">
        <nav className="term-menu" aria-label="Navigation">
          {links.map((link) => {
            const active = pathname === link.href;
            const shortcut =
              NAV_SHORTCUTS.find((item) => item.href === link.href)?.key ?? "";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`term-menu-item ${active ? "active" : ""}`}
              >
                {link.label}[{shortcut}]
              </Link>
            );
          })}
        </nav>

        <div className="term-rule term-rule-double" role="separator" />

        <div className="term-body">{children}</div>

        <TerminalStatus />
      </div>
    </div>
  );
}
