"use client";

import ContactLine from "@/components/ContactLine";
import { usePortfolio } from "@/components/PortfolioProvider";

export default function ContactPage() {
  const { portfolio } = usePortfolio();

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
