"use client";

import ContactLine from "@/components/ContactLine";
import { getPortfolio } from "@/lib/portfolio";
import { useT } from "@/components/LangProvider";

export default function ContactPage() {
  const { lang } = useT();
  const portfolio = getPortfolio(lang);

  return (
    <main className="page page-enter">
      <div className="contact-list">
        {portfolio.contactLinks.map((link) => (
          <ContactLine
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
