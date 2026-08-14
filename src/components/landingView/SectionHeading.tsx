import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};


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
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary leading-relaxed mt-3 text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
