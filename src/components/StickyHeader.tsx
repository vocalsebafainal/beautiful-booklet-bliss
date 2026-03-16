import { useState, useEffect } from "react";
import { Phone, Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jfif";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "সেবাসমূহ", href: "#categories" },
  { label: "কিভাবে কাজ করে", href: "#how-it-works" },
  { label: "ডেমো", href: "#demo" },
  { label: "রিভিউ", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Vocalseba Logo" className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10" />
          <span className="text-lg font-bold tracking-tight text-foreground md:text-xl">
            <span className="text-primary">Vocal</span>
            <span className="text-secondary">seba</span>
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeSection === link.href.slice(1)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Link
            to="/admin/login"
            className="hidden items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted md:flex"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            Admin Login
          </Link>
          <a
            href="https://wa.me/8801710922638"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn hidden items-center gap-2 px-4 py-2 text-sm md:flex md:px-6 md:py-3"
          >
            <Phone className="h-4 w-4" />
            <span>যোগাযোগ করুন</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <ShieldCheck className="h-4 w-4 text-primary" />
                Admin Login
              </Link>
              <a
                href="https://wa.me/8801710922638"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm"
              >
                <Phone className="h-4 w-4" />
                যোগাযোগ করুন
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default StickyHeader;
