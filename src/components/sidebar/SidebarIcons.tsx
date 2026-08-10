import type { IconType } from "react-icons";
import { Link, useLocation } from "react-router";

type SidebarIconsProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconType;
  query: string;
};

const SidebarIcons = ({icon: Icon, query}: SidebarIconsProps) => {
  const location = useLocation();
  return (
      <Link to={`${location.pathname}${query}`} >
        <Icon className="h-5 w-5 cursor-pointer text-[#506497] hover:text-[#7787af] hover:-translate-y-1 transition-transform duration-150" />
      </Link>
  );
};

export default SidebarIcons;
