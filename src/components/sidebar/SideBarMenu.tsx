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
  {icon:FaUsers, query:'/team'}, 
  {icon:FaPlusSquare, query:'?newTask=true'},
  {icon:HiSparkles, query:'?viewTaskProps=true'}
] as const;

const SideBarMenu = () => {
  const {data:user} = useAuth();
  if(user) return (
    <div className="bg-[#151921] fixed left-0 top-0 z-200 h-dvh py-5 pb-10 pl-6 shadow-3xl">

      <div className="h-full flex flex-col justify-between items-center">

        <Link to={"/dashboard"} className="cursor-pointer">
          <Logo />
        </Link>
    
        <div className="h-full flex flex-col justify-center gap-10 items-center">
          <SearchBar />
          <NotificationCenter />
          {icons.map(({icon, query}) => (
            <SidebarIcons icon={icon} query={query} key={query}  />
          ))}
        </div>

        <ProfileMenu name={user.name} />

      </div>

    </div>
  );
};

export default SideBarMenu;
