"use client";

import SpecRow from "@/components/SpecRow";
import { portfolio } from "@/lib/portfolio";
import { ui } from "@/lib/ui";

export default function ExperiencePage() {
  const { experience } = portfolio;

  return (
    <main className="page page-enter">
      <div className="term-list">
        {experience.map((exp) => (
          <article key={exp.id} className="term-entry">
            <div className="term-entry-header">
              <span className="term-entry-name">{exp.company}</span>
            </div>
            <SpecRow label={ui.experience.period} value={exp.period} />
            <SpecRow label={ui.experience.role} value={exp.role} />
            <p className="term-entry-desc">{exp.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
