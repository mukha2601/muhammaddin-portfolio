"use client";

import { useT } from "@/components/LangProvider";
import { getPortfolio } from "@/lib/portfolio";

export default function ProjectsPage() {
  const { t, lang } = useT();
  const portfolio = getPortfolio(lang);

  return (
    <main className="page page-enter">
      <div className="container page-content">
        <div className="page-header">
          <p className="page-tag">{t.projects.tag}</p>
          <h1 className="page-title">{t.projects.title}</h1>
        </div>

        <div className="projects-list">
          {portfolio.projects.map((project) => (
            <article key={project.id} className="project-card-h">
              <div className="project-card-top">
                <div className="project-card-image" aria-label={project.title}>
                  {project.colors.map((color, i) => (
                    <div
                      key={i}
                      className="project-pixel"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="project-card-link-wrap">
                  <h2 className="project-card-title">{project.title}</h2>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-visit-link"
                  >
                    {t.projects.visit}
                  </a>
                </div>
              </div>

              <p className="project-card-desc">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
