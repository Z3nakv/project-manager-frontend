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
import ThemeToggle from "../themeToggle/ThemeToggle";

const icons = [
  {icon:FaUsers, query:'/team', name:"Team", id:"team"}, 
  {icon:FaPlusSquare, query:'?newTask=true', name:"Nueva Tarea", id:"task"},
  {icon:FaPlusSquare, query:'/create-project', name:"Nuevo Proyecto", id:"project"},
  {icon:HiSparkles, query:'?viewTaskProps=true', name:"Crear con IA", id:"ia"}
] as const;

const SideBarMenu = () => {
  const {data:user} = useAuth();
  if(user) return (
    <div className="border-r border-border-subtle bg-sidebar fixed left-0 top-0 z-200 h-dvh w-20 lg:w-58 py-5 pb-10 px-6 transition-[width] duration-200">

      <div className="h-full flex flex-col justify-between items-center">
        
        <Logo />
    
        <div className="h-full flex flex-col items-start justify-center gap-10">
          <SearchBar />
          <NotificationCenter />
          {icons.map((data) => (
            <SidebarIcons data={data}  />
          ))}
          <ThemeToggle/>
        </div>

        <ProfileMenu name={user.name} />

      </div>

    </div>
  );
};

export default SideBarMenu;
