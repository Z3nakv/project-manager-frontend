const Logo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
    
      <img 
      src="/public/icons/apple-touch-icon.png"
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
