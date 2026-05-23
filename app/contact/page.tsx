"use client";

import { useT } from "@/components/LangProvider";
import { profileMeta } from "@/lib/i18n";
import { FormEvent, useState } from "react";

export default function ContactPage() {
  const { t } = useT();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="page page-enter">
      <div className="container page-content">
        <div className="page-header">
          <p className="page-tag">{t.contact.tag}</p>
          <h1 className="page-title">{t.contact.title}</h1>
        </div>

        <div className="contact-layout">
          <div className="contact-links">
            {profileMeta.contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="contact-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-icon">{link.icon}</div>
                <div>
                  <div className="contact-label">{link.label}</div>
                  <div className="contact-value">{link.value}</div>
                </div>
              </a>
            ))}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                {t.contact.name}
              </label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder={t.contact.namePlaceholder}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t.contact.email}
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                className="form-textarea"
                placeholder={t.contact.messagePlaceholder}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {sent ? t.contact.sent : t.contact.send}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
