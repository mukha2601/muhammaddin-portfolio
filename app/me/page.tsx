"use client";

import Image from "next/image";
import { useT } from "@/components/LangProvider";
import { getPortfolio } from "@/lib/portfolio";

export default function MePage() {
  const { t, lang } = useT();
  const portfolio = getPortfolio(lang);

  return (
    <main className="page page-enter">
      <div className="container page-content">
        <div className="me-layout">
          <div className="me-photo" aria-label="Profile photo">
            <Image
              src={portfolio.profile.photoUrl}
              alt="Profile photo"
              width={280}
              height={280}
              priority
              className="me-photo-img"
            />
          </div>

          <div className="me-info">
            <p className="page-tag">{t.me.tag}</p>
            <h1 className="page-title">{portfolio.profile.name}</h1>
            <p className="me-role">{portfolio.profile.role}</p>

            <a
              href={portfolio.profile.cvUrl}
              download
              className="btn btn-primary me-cv-btn"
            >
              {t.me.downloadCv}
            </a>
          </div>
        </div>

        <section className="skills-section">
          <h2 className="skills-section-title">{t.me.skillsTitle}</h2>

          <div className="skills-groups">
            <div className="skills-group">
              <h3 className="skills-group-title">{t.me.frontendTitle}</h3>
              <div className="skills-chip-grid">
                {portfolio.skills.frontend.map((skill) => (
                  <div key={skill.name} className="skill-chip">
                    <span className="skill-chip-icon">{skill.icon}</span>
                    <span className="skill-chip-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-group">
              <h3 className="skills-group-title">{t.me.mobileTitle}</h3>
              <div className="skills-chip-grid">
                {portfolio.skills.mobile.map((skill) => (
                  <div key={skill.name} className="skill-chip">
                    <span className="skill-chip-icon">{skill.icon}</span>
                    <span className="skill-chip-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
