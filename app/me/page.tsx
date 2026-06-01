"use client";

import Image from "next/image";
import SpecRow from "@/components/SpecRow";
import { useT } from "@/components/LangProvider";
import { getPortfolio } from "@/lib/portfolio";

export default function MePage() {
  const { t, lang } = useT();
  const portfolio = getPortfolio(lang);
  const frontend = portfolio.skills.frontend.map((s) => s.name).join(", ");
  const mobile = portfolio.skills.mobile.map((s) => s.name).join(", ");

  return (
    <main className="page page-me page-enter">
      <div className="me-layout">
        <div className="me-photo" aria-label="Profile photo">
          <Image
            src={portfolio.profile.photoUrl}
            alt="Profile photo"
            width={340}
            height={400}
            priority
            className="me-photo-img"
          />
        </div>

        <div className="me-info">
          <SpecRow label={t.me.labels.name} value={portfolio.profile.name} />
          <div className="me-rule" role="separator" aria-hidden="true" />
          <SpecRow label={t.me.labels.frontend} value={frontend} />
          <div className="me-rule" role="separator" aria-hidden="true" />
          <SpecRow label={t.me.labels.mobile} value={mobile} />
        </div>
      </div>
    </main>
  );
}
