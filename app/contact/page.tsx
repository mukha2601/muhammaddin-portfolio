"use client";

import SpecRow from "@/components/SpecRow";
import { useT } from "@/components/LangProvider";
import { getPortfolio } from "@/lib/portfolio";

export default function ContactPage() {
  const { lang } = useT();
  const portfolio = getPortfolio(lang);

  return (
    <main className="page page-enter">
      <div className="spec-col">
        {portfolio.contactLinks.map((link) => (
          <SpecRow
            key={link.label}
            label={link.label}
            value={link.value}
            href={link.href}
          />
        ))}
      </div>
    </main>
  );
}
