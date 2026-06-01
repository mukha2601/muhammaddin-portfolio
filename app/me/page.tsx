"use client";

import Image from "next/image";
import SpecRow from "@/components/SpecRow";
import { usePortfolio } from "@/components/PortfolioProvider";
import { ui } from "@/lib/ui";

export default function MePage() {
  const { portfolio } = usePortfolio();
  const { profile, skills } = portfolio;

  return (
    <main className="page page-me page-enter">
      <div className="me-layout">
        <div className="me-photo" aria-label="Profile photo">
          <Image
            src={profile.photoUrl}
            alt="Profile photo"
            width={340}
            height={400}
            priority
            className="me-photo-img"
          />
        </div>

        <div className="me-info">
          <SpecRow label={ui.me.labels.name} value={profile.name} />
          {skills.map((group, index) => (
            <div key={`${group.name}-${index}`}>
              <div className="me-rule" role="separator" aria-hidden="true" />
              <SpecRow
                label={group.name}
                value={group.items.join(", ")}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
