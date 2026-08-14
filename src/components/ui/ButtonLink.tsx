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
      className={` ${classname} ${to === "team" ? 'w-full' : ''} font-sans flex justify-center items-center md:max-w-xs gap-2 bg-surface-elevated hover:bg-surface-hover 
      border border-border text-text-secondary hover:text-text-primary text-xs font-semibold 
      px-4 py-2 rounded-xl transition-colors duration-150 shadow-md`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
};

export default ButtonLink;
