import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

/**
 * Encabezado reutilizable de sección:
 * eyebrow mono (uppercase, tracking-widest, índigo) + título display + subtítulo.
 * Reproduce el patrón de "section label" usado en el dashboard.
 */
const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) => {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignCls} ${className}`}>
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 leading-relaxed mt-3 text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
