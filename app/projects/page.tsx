"use client";

import SpecRow from "@/components/SpecRow";
import { useT } from "@/components/LangProvider";
import { getPortfolio } from "@/lib/portfolio";

export default function ProjectsPage() {
  const { t, lang } = useT();
  const portfolio = getPortfolio(lang);

  return (
    <main className="page page-enter">
      <div className="term-list">
        {portfolio.projects.map((project, i) => (
          <article key={project.id} className="term-entry">
            <div className="term-entry-header">
              <span className="term-entry-id">[{i + 1}]</span>
              <span className="term-entry-name">{project.title}</span>
            </div>
            <SpecRow label={t.projects.url} value={project.url} href={project.url} />
            <p className="term-entry-desc">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="term-action"
            >
              {t.projects.visit} →
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
