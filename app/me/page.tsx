"use client";

import Image from "next/image";
import SpecRow from "@/components/SpecRow";
import { portfolio } from "@/lib/portfolio";
import { ui } from "@/lib/ui";

export default function MePage() {
  const { profile, skills } = portfolio;
  const frontend = skills.frontend.join(", ");
  const mobile = skills.mobile.join(", ");

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
          <div className="me-rule" role="separator" aria-hidden="true" />
          <SpecRow label={ui.me.labels.frontend} value={frontend} />
          <div className="me-rule" role="separator" aria-hidden="true" />
          <SpecRow label={ui.me.labels.mobile} value={mobile} />
        </div>
      </div>
    </main>
  );
}
