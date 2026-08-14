import Logo from "../Logo";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Producto",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Beneficios", href: "#beneficios" },
      { label: "IA", href: "#ia" },
      { label: "Precios", href: "#cta" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Documentación", href: "#funcionalidades" },
      { label: "Guía de inicio rápido", href: "#beneficios" },
      { label: "Soporte", href: "#cta" },
    ],
  },
];

const socials = [
  { Icon: FaGithub, label: "GitHub", href: "https://github.com" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: FaTwitter, label: "Twitter", href: "https://twitter.com" },
];

const FooterSection = () => {
  return (
    <footer className="border-t border-border-subtle bg-bg text-text-primary">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <Logo />
          <p className="text-sm text-text-secondary mt-4 max-w-sm leading-relaxed">
            Gestión de proyectos, tareas y equipos en tiempo real con
            sugerencias de IA. Construido para equipos que entregan a tiempo.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-surface-base text-text-primary border border-border hover:text-primary hover:border-primary/40 flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary font-mono mb-4">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:rounded"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border-subtle py-6 px-6 text-center">
        <p className="text-xs text-text-muted font-mono">
          © {new Date().getFullYear()} Project Manager — React · Node.js ·
          Socket.io · MongoDB · Gemini AI
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
