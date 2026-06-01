import DottedLine from "./DottedLine";

export default function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <DottedLine label={label}>
      <a
        href={href}
        className="contact-value"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {value}
      </a>
    </DottedLine>
  );
}
