import type { IconType } from "react-icons";
import { useNavigate } from "react-router";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  query: string;
  icon: IconType;
  children: React.ReactNode;
};
const Button = ({ query, icon: Icon, children }: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(location.pathname + `${query}`)}
      className="overflow-visible truncate font-sans cursor-pointer flex justify-center items-center w-full md:max-w-xs gap-2 bg-primary hover:bg-primary-hover
       text-text-on-primary text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md"
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
};

export default Button;
