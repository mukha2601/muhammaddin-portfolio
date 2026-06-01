"use client";

import SpecRow from "@/components/SpecRow";
import { useT } from "@/components/LangProvider";
import { getPortfolio } from "@/lib/portfolio";

export default function ExperiencePage() {
  const { t, lang } = useT();
  const portfolio = getPortfolio(lang);

  return (
    <main className="page page-enter">
      <div className="term-list">
        {portfolio.experience.map((exp, i) => (
          <article key={exp.id} className="term-entry">
            <div className="term-entry-header">
              <span className="term-entry-id">[{i + 1}]</span>
              <span className="term-entry-name">{exp.company}</span>
            </div>
            <SpecRow label={t.experience.period} value={exp.period} />
            <SpecRow label="Role" value={exp.role} />
            <p className="term-entry-desc">{exp.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
