import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import logo from "@/assets/logo.jfif";
import ThemeToggle from "./ThemeToggle";

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Vocalseba Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
          <span className="text-foreground font-bold text-lg md:text-xl tracking-tight">
            <span className="text-primary">Vocal</span><span className="text-secondary">seba</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://wa.me/8801XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn flex items-center gap-2 text-sm px-4 py-2 md:px-6 md:py-3"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">যোগাযোগ করুন</span>
            <span className="sm:hidden">Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
