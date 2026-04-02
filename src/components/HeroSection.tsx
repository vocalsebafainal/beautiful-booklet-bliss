import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, Users, Zap } from "lucide-react";
import studioBg from "@/assets/studio-bg.jpg";

const SoundwaveBars = () => {
  const bars = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[3px] opacity-20 pointer-events-none overflow-hidden">
      {bars.map((i) => (
        <div
          key={i}
          className={`w-[2px] md:w-[3px] bg-primary/60 rounded-full ${
            i % 3 === 0 ? "soundwave-bar-slow" : "soundwave-bar"
          }`}
          style={{ animationDelay: `${i * 0.08}s`, height: "8px" }}
        />
      ))}
    </div>
  );
};

const rotatingWords = ["বিজ্ঞাপন", "ইউটিউব", "পডকাস্ট", "অডিওবুক", "ই-লার্নিং"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <img src={studioBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
      
      {/* Bokeh particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/20 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
      
      <SoundwaveBars />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black gradient-text tracking-tight mb-3 md:text-8xl">
            কণ্ঠ হোক প্রচারের<br />বিশ্বস্ত সঙ্গী
          </h1>
          <p className="text-muted-foreground text-sm md:text-xl tracking-widest uppercase">
            কন্ঠ হোক স্বপ্ন জয়ের ঠিকানা।
          </p>
        </motion.div>

        {/* Rotating text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 md:mb-10 h-12 md:h-14 flex items-center justify-center"
        >
          <span className="text-muted-foreground text-base md:text-lg">প্রফেশনাল ভয়েসওভার — </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-primary font-bold text-lg md:text-xl ml-2"
            >
              {rotatingWords[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToCategories}
          className="gold-btn text-lg md:text-xl px-10 py-5 group pulse-glow-btn"
        >
          ভয়েস ক্যাটাগরি দেখুন
          <ChevronDown className="w-5 h-5 inline-block ml-2 group-hover:translate-y-1 transition-transform" />
        </motion.button>

        {/* Social Proof Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-10 md:mt-14"
        >
          <div className="flex items-center gap-2 glass-card px-4 py-2.5">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-foreground text-sm font-semibold">500+</span>
            <span className="text-muted-foreground text-sm">সন্তুষ্ট ক্লায়েন্ট</span>
          </div>
          <div className="flex items-center gap-2 glass-card px-4 py-2.5">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-foreground text-sm font-semibold">4.9</span>
            <span className="text-muted-foreground text-sm">রেটিং</span>
          </div>
          <div className="flex items-center gap-2 glass-card px-4 py-2.5">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-foreground text-sm font-semibold">১২ ঘণ্টা</span>
            <span className="text-muted-foreground text-sm">ফাস্ট ডেলিভারি</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
