const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Icon */}
      <div className="flex items-center justify-center w-9 h-9 bg-indigo-600 rounded-lg shadow-md shrink-0">
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="5" height="10" rx="1" fill="currentColor" opacity="0.6"/>
          <rect x="9.5" y="3" width="5" height="7" rx="1" fill="currentColor"/>
          <rect x="16" y="3" width="5" height="13" rx="1" fill="currentColor" opacity="0.6"/>
          <path d="M6 17l2 2 4-4" strokeWidth={2} stroke="white" fill="none"/>
        </svg>
      </div>

      {/* Text — inline, one line */}
      <span className="text-lg font-extrabold tracking-tight text-slate-100 whitespace-nowrap">
        Project <span className="text-indigo-400">Manager</span>
      </span>
    </div>
  );
};

export default Logo;