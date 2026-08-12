const Logo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
    
      <img 
      src="/icons/apple-touch-icon.png"
      width={36}
      height={36}
      alt="Logo de Project Manager"
      className="flex items-center justify-center w-9 h-9 rounded-lg shadow-md shrink-0"
      />

      {

        <span className="hidden text-lg font-extrabold tracking-tight text-slate-100 whitespace-nowrap">
          Project <span className="text-indigo-400">Manager</span>
        </span>
      }
    </div>
  );
};

export default Logo;
