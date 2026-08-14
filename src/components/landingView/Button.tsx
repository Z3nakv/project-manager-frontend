import { Link } from "react-router";
import type { ReactNode } from "react";

type ButtonProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

const Button = ({
  to,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) => {
  const base =
    "font-mono inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60";

  const sizes = size === "lg" ? "px-8 py-3.5 text-base" : "px-5 py-2.5 text-sm";

  const variants = {
    primary:
      "bg-primary hover:bg-primary-hover text-text-on-primary shadow-lifted hover:-translate-y-0.5",
    secondary:
      "border border-border hover:border-primary/50 text-text-secondary hover:text-primary bg-transparent",
    ghost: "text-text-secondary hover:text-primary",
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
