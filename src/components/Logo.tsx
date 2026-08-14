import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
    to={'/'}
    className="flex items-center gap-3 cursor-pointer">
      <img 
      src="/icons/apple-touch-icon.png"
      width={36}
      height={36}
      alt="Logo de Project Manager"
      className="flex items-center justify-center w-9 h-9 rounded-lg shadow-md shrink-0"
      />
        <span className="lg:block hidden text-lg font-extrabold tracking-tight text-text-primary whitespace-nowrap">
          Tree <span className="text-accent">Work</span>
        </span>
    </Link>
  );
};

export default Logo;
