"use client";

import SpecRow from "@/components/SpecRow";
import { useT } from "@/components/LangProvider";
import { getPortfolio } from "@/lib/portfolio";

export default function StackPage() {
  const { t, lang } = useT();
  const portfolio = getPortfolio(lang);
  const frontend = portfolio.skills.frontend.map((s) => s.name).join(", ");
  const mobile = portfolio.skills.mobile.map((s) => s.name).join(", ");

  return (
    <main className="page page-enter">
      <div className="spec-grid">
        <div className="spec-col">
          <SpecRow label={t.stack.frontend} value={frontend} />
        </div>
        <div className="spec-col">
          <SpecRow label={t.stack.mobile} value={mobile} />
        </div>
      </div>
    </main>
  );
}
