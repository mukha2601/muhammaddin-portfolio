export default function SpecRow({
  label,
  value,
  href,
  download,
}: {
  label: string;
  value: string;
  href?: string;
  download?: boolean;
}) {
  return (
    <div className="spec-row">
      <span className="spec-label">{label}:</span>
      {href ? (
        <a
          href={href}
          className="spec-value spec-link"
          {...(download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {value}
        </a>
      ) : (
        <span className="spec-value">{value}</span>
      )}
    </div>
  );
}
