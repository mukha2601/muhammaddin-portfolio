import type { ReactNode } from "react";

export default function DottedLine({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="contact-line">
      <span className="contact-label">{label.toLowerCase()}</span>
      <span className="contact-leader" aria-hidden="true" />
      <span className="contact-value-wrap">{children}</span>
    </div>
  );
}
