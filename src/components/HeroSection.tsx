import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
          style={{
            animationDelay: `${i * 0.08}s`,
            height: "8px",
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
      <SoundwaveBars />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6 md:mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-muted-foreground text-xs md:text-sm">
              বাংলাদেশের #১ ভয়েস ওভার এজেন্সি
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 md:mb-6"
        >
          কণ্ঠ, কন্টেন্ট{" "}
          <span className="text-primary">জাদু</span> –<br />
          আপনার কাজের জন্য{" "}
          <span className="text-secondary">সেরা ভয়েস ওভার</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-12"
        >
          প্রফেশনাল ভয়েস ওভার সার্ভিস — অ্যাডভার্টাইজমেন্ট, ইউটিউব, অডিওবুক, কর্পোরেট ন্যারেশন এবং আরও অনেক কিছু।
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToCategories}
          className="gold-btn text-base md:text-lg group"
        >
          ভয়েস ক্যাটাগরি দেখুন
          <ChevronDown className="w-5 h-5 inline-block ml-2 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
