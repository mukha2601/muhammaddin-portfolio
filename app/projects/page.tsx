"use client";

import SpecRow from "@/components/SpecRow";
import { portfolio } from "@/lib/portfolio";
import { ui } from "@/lib/ui";

export default function ProjectsPage() {
  const { projects } = portfolio;

  return (
    <main className="page page-enter">
      <div className="term-list">
        {projects.map((project, i) => (
          <article key={project.id} className="term-entry">
            <div className="term-entry-header">
              <span className="term-entry-id">[{i + 1}]</span>
              <span className="term-entry-name">{project.title}</span>
            </div>
            <SpecRow label={ui.projects.url} value={project.url} href={project.url} />
            <p className="term-entry-desc">{project.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
