"use client";

import Image from "next/image";
import SpecRow from "@/components/SpecRow";
import { useT } from "@/components/LangProvider";
import { getPortfolio } from "@/lib/portfolio";

export default function MePage() {
  const { t, lang } = useT();
  const portfolio = getPortfolio(lang);

  return (
    <main className="page page-enter">
      <div className="spec-layout">
        <div className="spec-photo" aria-label="Profile photo">
          <Image
            src={portfolio.profile.photoUrl}
            alt="Profile photo"
            width={200}
            height={240}
            priority
            className="spec-photo-img"
          />
        </div>

        <div className="spec-grid">
          <div className="spec-col">
            <SpecRow label={t.me.labels.role} value={portfolio.profile.role} />
            <SpecRow
              label={t.me.labels.cv}
              value={t.me.downloadCv}
              href={portfolio.profile.cvUrl}
              download
            />
          </div>
        </div>
      </div>
    </main>
  );
}
