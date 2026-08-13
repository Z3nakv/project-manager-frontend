import { Link } from "react-router";
import Logo from "../Logo";
import {
  FaUsers,
  FaPlusSquare,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import SidebarIcons from "./SidebarIcons";
import NotificationCenter from "../NotificationCenter";
import { useAuth } from "../../hooks/useAuth";
import ProfileMenu from "../ProfileMenu";
import SearchBar from "../SearchBar";

const icons = [
  {icon:FaUsers, query:'/team', name:"Team"}, 
  {icon:FaPlusSquare, query:'?newTask=true', name:"Nueva Tarea"},
  {icon:HiSparkles, query:'?viewTaskProps=true', name:"Crear con IA"}
] as const;

const SideBarMenu = () => {
  const {data:user} = useAuth();
  if(user) return (
    <div className="bg-[#151921] fixed left-0 top-0 z-200 h-dvh w-20 lg:w-58 py-5 pb-10 px-6 shadow-3xl transition-[width] duration-200">

      <div className="h-full flex flex-col justify-between items-center">

        <Link to={"/dashboard"} className="cursor-pointer">
          <Logo />
        </Link>
    
        <div className="h-full flex flex-col items-start justify-center gap-10">
          <SearchBar />
          <NotificationCenter />
          {icons.map(({icon, query, name}) => (
            <SidebarIcons icon={icon} query={query} name={name} key={query}  />
          ))}
        </div>

        <ProfileMenu name={user.name} />

      </div>

    </div>
  );
};

export default SideBarMenu;
