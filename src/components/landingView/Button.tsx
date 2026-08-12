import { Link } from "react-router";
import type { ReactNode } from "react";

type ButtonProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

/**
 * Botón genérico de la landing que actúa como enlace (react-router).
 * Sigue la convención de botones del proyecto: índigo primario,
 * bordes #2d3348 en secundario, radius-xl y leve elevación en hover.
 */
const Button = ({
  to,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) => {
  const base =
    "font-sans inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60";

  const sizes = size === "lg" ? "px-8 py-3.5 text-base" : "px-5 py-2.5 text-sm";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5",
    secondary:
      "border border-[#2d3348] hover:border-indigo-500/50 text-slate-300 hover:text-indigo-300 bg-transparent",
    ghost: "text-slate-400 hover:text-indigo-300",
  };

  return (
    <Link
      to={to}
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
};

export default Button;
