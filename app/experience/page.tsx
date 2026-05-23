"use client";

import { useT } from "@/components/LangProvider";
import { getPortfolio } from "@/lib/portfolio";

export default function ExperiencePage() {
  const { t, lang } = useT();
  const portfolio = getPortfolio(lang);

  return (
    <main className="page page-enter">
      <div className="container page-content">
        <div className="page-header">
          <p className="page-tag">{t.experience.tag}</p>
          <h1 className="page-title">{t.experience.title}</h1>
        </div>

        <div className="experience-list">
          {portfolio.experience.map((exp) => (
            <article key={exp.id} className="experience-card">
              <div className="experience-header">
                <div>
                  <h2 className="experience-company">{exp.company}</h2>
                  <p className="experience-role">{exp.role}</p>
                </div>
                <span className="experience-period">{exp.period}</span>
              </div>
              <p className="experience-desc">{exp.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
