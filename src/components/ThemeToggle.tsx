import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved ? saved === "dark" : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="relative w-10 h-10 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center justify-center transition-all duration-300 hover:bg-muted"
      aria-label="Toggle theme"
    >
      <Sun
        className={`w-5 h-5 text-primary absolute transition-all duration-300 ${
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`w-5 h-5 text-primary absolute transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
