import type { IconType } from "react-icons";
import { Link, useLocation } from "react-router";

type SidebarIconsProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  data:{
  icon: IconType;
  query: string;
  name: string;
  id: string;}
};

const DASHBOARD_HIDDEN_ROUTES_REGEX = [
  /^\/dashboard$/,
  /^\/dashboard\/create-project$/,
  /^\/projects\/[^/]+\/edit$/,
];

const PROJECT_DETAILS_HIDDEN_ROUTES_REGEX = [
  /^\/projects\/[^/]+$/
];

const SidebarIcons = ({data}: SidebarIconsProps) => {
  const location = useLocation();
  const shouldHide = DASHBOARD_HIDDEN_ROUTES_REGEX.some((pattern) => pattern.test(location.pathname));
  const taskShouldHide = PROJECT_DETAILS_HIDDEN_ROUTES_REGEX.some((pattern) => pattern.test(location.pathname));

  if (shouldHide) {
    if (data.id === 'team') return null;
    if (data.id === 'ia') return null;
    if (data.id === 'task') return null;
    if(data.id === 'project') return null;
  }

  if(taskShouldHide) {
    if(data.id === 'project') return null;
  }

  if(/^\/projects\/[^/]+\/team$/.test(location.pathname)) return;
  if(location.pathname === '/profile') return;
  if(location.pathname === '/profile/password') return;

  return (
      <Link 
      to={`${location.pathname}${data.query}`}
      className="flex gap-2 text-slate-400 font-mono hover:text-[#7787af] hover:-translate-y-1 transition-transform duration-150"
      >
        <data.icon 
        className="h-5 w-5 cursor-pointer text-slate-400 hover:text-[#7787af] hover:-translate-y-1 transition-transform duration-150" />
        <p className="hidden lg:block">{data.name}</p>
      </Link>
  );
};

export default SidebarIcons;
