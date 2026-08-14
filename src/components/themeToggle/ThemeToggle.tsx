import { useEffect, useState } from 'react';
import { MdDarkMode  } from "react-icons/md";
import { MdLightMode  } from "react-icons/md";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => setDark(prev => !prev)}
      className="cursor-pointer flex gap-2 text-text-secondary font-mono hover:text-primary hover:-translate-y-1 transition-transform duration-150"
    >
      {dark 
      ? <MdDarkMode 
      className="h-5 w-5"/> 
      : <MdLightMode  
      className="h-5 w-5" />
        }
        <p className="hidden lg:block">Apariencia</p>
    </button>
  );
}