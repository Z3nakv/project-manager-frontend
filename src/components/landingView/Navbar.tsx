import { Link } from "react-router";
import Logo from "../Logo";
import Button from "./Button";

const links = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "IA", href: "#ia" },
  { label: "Testimonios", href: "#testimonios" },
];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between gap-3 px-6 lg:px-10 py-4 border-b border-[#1e2330] sticky top-0 z-50 bg-[#151921]">
      <Link to="/dashboard" className="cursor-pointer" aria-label="Inicio">
        <Logo />
      </Link>

      <ul className="hidden md:flex items-center gap-8 font-mono text-sm text-slate-400">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="hover:text-indigo-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:rounded"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button to="/auth/login" variant="ghost" className="hidden sm:inline-flex">
          Iniciar sesión
        </Button>
        <Button to="/auth/register" variant="primary" className="shrink-0">
          Comenzar gratis
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
