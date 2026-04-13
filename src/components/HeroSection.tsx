import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mic } from "lucide-react";
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
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight mb-3 md:text-8xl">
            <span className="text-white">কণ্ঠ হোক</span>{" "}
            <span className="gradient-text">প্রচারের</span><br />
            <span className="gradient-text">বিশ্বস্ত সঙ্গী</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-xl tracking-widest uppercase">
            আপনার ব্র্যান্ড, কন্টেন্ট বা বিজ্ঞাপনকে প্রাণবন্ত করুন আমাদের প্রফেশনাল বাংলা ভয়েস ওভার দিয়ে।
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

        {/* Social Proof Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 md:mt-14 flex justify-center"
        >
          <div className="glass-card px-8 py-6 md:px-12 md:py-8 flex flex-col items-center gap-5 relative overflow-hidden">
            {/* Mic icon with purple glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse-glow scale-150" />
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Mic className="w-7 h-7 md:w-9 md:h-9 text-primary" />
              </div>
            </div>

            {/* Mini soundwave bars */}
            <div className="flex items-center gap-[3px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full bg-primary/60 soundwave-bar"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    height: "6px",
                  }}
                />
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 md:gap-10">
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-foreground">৫০০+</p>
                <p className="text-xs md:text-sm text-muted-foreground">প্রজেক্ট</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-foreground">২৪ঘণ্টা</p>
                <p className="text-xs md:text-sm text-muted-foreground">ডেলিভারি</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-primary">৪.৯★</p>
                <p className="text-xs md:text-sm text-muted-foreground">রেটিং</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
