import type { IconType } from "react-icons";
import { Link, useLocation } from "react-router";

type SidebarIconsProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconType;
  query: string;
  name: string;
};

const SidebarIcons = ({icon: Icon, query, name}: SidebarIconsProps) => {
  const location = useLocation();
  query = query === '?newTask=true' 
  ? location.pathname === '/dashboard' 
  ? '/create-project' : query
  : query

  name = name === 'Nueva Tarea'
  ? location.pathname === '/dashboard'
  ? 'Nuevo Proyecto' : name
  : name
  
  if(location.pathname === '/dashboard'){
    if(query === '/team') return
    if(query === '?viewTaskProps=true') return;
  }
  
  return (
      <Link 
      to={`${location.pathname}${query}`} 
      className="flex gap-2 text-slate-400 font-mono hover:text-[#7787af] hover:-translate-y-1 transition-transform duration-150"
      >
        <Icon 
        className="h-5 w-5 cursor-pointer text-slate-400 hover:text-[#7787af] hover:-translate-y-1 transition-transform duration-150" />
        <p className="hidden lg:block">{name}</p>
      </Link>
  );
};

export default SidebarIcons;
