"use client";

import ContactLine from "@/components/ContactLine";
import { portfolio } from "@/lib/portfolio";

export default function ContactPage() {
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
