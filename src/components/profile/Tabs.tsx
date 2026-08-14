import { FingerPrintIcon, UserIcon } from "@heroicons/react/20/solid";
import { NavLink, useLocation, useNavigate } from "react-router";

const tabs = [
  { name: "Mi Cuenta", href: "/profile", icon: UserIcon },
  { name: "Cambiar Password", href: "/profile/password", icon: FingerPrintIcon },
];

export default function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = tabs.filter((tab) => tab.href === location.pathname)[0].href;

  return (
    <div className="mb-8">

      {/* Mobile select */}
      <div className="sm:hidden max-w-sm m-auto">
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-lg bg-input border border-border text-text-secondary text-sm px-3 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-150"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => navigate(e.target.value)}
          value={currentTab}
        >
          {tabs.map((tab) => (
            <option value={tab.href} key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>

      {/* Desktop tabs */}
      <div className="hidden sm:block">
        <div className="border-b border-border-subtle">
          <nav className="-mb-px flex gap-1" aria-label="Tabs">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.href}
                end
                className={({ isActive }) =>
                  `group inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-150 ${
                    isActive
                      ? "border-primary text-text-primary"
                      : "border-transparent text-text-muted hover:text-text-primary hover:border-border"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <tab.icon
                      className={`w-4 h-4 transition-colors duration-150 ${isActive ? "text-accent" : "text-text-muted group-hover:text-text-primary"}`}
                      aria-hidden="true"
                    />
                    <span>{tab.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

    </div>
  );
}