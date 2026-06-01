"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TerminalStatus from "./TerminalStatus";
import { useT } from "./LangProvider";

export default function TerminalChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useT();

  const links = [
    { href: "/me", label: t.nav.me },
    { href: "/projects", label: t.nav.projects },
    { href: "/experience", label: t.nav.experience },
    { href: "/contact", label: t.nav.contact },
    { href: "/settings", label: t.nav.settings },
  ];

  return (
    <div className="crt-screen">
      <div className="term-window">
        <nav className="term-menu" aria-label="Navigation">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`term-menu-item ${active ? "active" : ""}`}
              >
                {link.label}
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
