import type { IconType } from "react-icons";
import { Link, useLocation } from "react-router";

type SidebarIconsProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  data:{
  icon: IconType;
  query: string;
  name: string;
  id: string;}
};

const HIDDEN_ICON_RULES: { pattern: RegExp; hideIds: string[] | "*" }[] = [
  { pattern: /^\/dashboard$/, hideIds: ["team", "ia", "task"] },
  { pattern: /^\/projects\/[^/]+\/edit$/, hideIds: ["team", "ia", "task"] },
  { pattern: /^\/projects\/[^/]+$/, hideIds: ["project"] },
  { pattern: /^\/dashboard\/create-project$/, hideIds: ["project", "task", "team", "ia"] },
  { pattern: /^\/projects\/[^/]+\/team$/, hideIds: "*" },
  { pattern: /^\/profile$/, hideIds: "*" },
  { pattern: /^\/profile\/password$/, hideIds: "*" },
];

const SidebarIcons = ({data}: SidebarIconsProps) => {
  const location = useLocation();
  
  const isHidden = HIDDEN_ICON_RULES.some(({ pattern, hideIds }) => {
    if (!pattern.test(location.pathname)) return false;
    return hideIds === "*" || hideIds.includes(data.id);
  });

  if (isHidden) return null;

  return (
      <Link 
      to={`${location.pathname}${data.query}`}
      data-tour={`sidebar-${data.id}`}
      className="flex gap-2 text-text-muted font-mono hover:text-primary hover:-translate-y-1 transition-transform duration-150"
      >
        <data.icon 
        className="h-5 w-5 cursor-pointer text-text-muted hover:text-primary hover:-translate-y-1 transition-transform duration-150" />
        <p className="hidden lg:block">{data.name}</p>
      </Link>
  );
};

export default SidebarIcons;
