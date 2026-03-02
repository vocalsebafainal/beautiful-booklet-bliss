import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full bg-card border border-border/50 text-foreground shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/8801710922638"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="w-14 h-14 rounded-full bg-[hsl(142,70%,49%)] text-white shadow-xl flex items-center justify-center hover:bg-[hsl(142,70%,42%)] transition-colors whatsapp-pulse"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
