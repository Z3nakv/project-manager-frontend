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
      <div className="sm:hidden">
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-lg bg-[#1e2330] border border-[#2d3348] text-slate-300 text-sm px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150"
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
        <div className="border-b border-[#2d3348]">
          <nav className="-mb-px flex gap-1" aria-label="Tabs">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.href}
                end
                className={({ isActive }) =>
                  `group inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-150 ${
                    isActive
                      ? "border-indigo-500 text-slate-200"
                      : "border-transparent text-slate-500 hover:text-slate-300 hover:border-[#2d3348]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <tab.icon
                      className={`w-4 h-4 transition-colors duration-150 ${isActive ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-400"}`}
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