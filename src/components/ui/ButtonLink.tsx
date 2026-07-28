import type { IconType } from "react-icons";
import { Link } from "react-router";

type ButtonLinkProps = {
    icon: IconType
    to: string,
    children: React.ReactNode
    classname?: string
}

const ButtonLink = ({icon: Icon, to, children, classname} : ButtonLinkProps) => {
  return (
    <Link
      to={to}
      className={` ${classname} ${to === "team" ? 'w-full' : ''} flex justify-center items-center md:max-w-xs gap-2 bg-[#1e2330] hover:bg-[#252d3d] 
      border border-[#2d3348] text-slate-300 hover:text-slate-100 text-xs font-semibold 
      px-4 py-2 rounded-xl transition-colors duration-150 shadow-md`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
};

export default ButtonLink;
