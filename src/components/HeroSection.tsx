import { motion } from "framer-motion";
import { ChevronDown, Star, Users, Zap } from "lucide-react";
import studioBg from "@/assets/studio-bg.jpg";

const SoundwaveBars = () => {
  const bars = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[3px] opacity-20 pointer-events-none overflow-hidden">
      {bars.map((i) =>
      <div
        key={i}
        className={`w-[2px] md:w-[3px] bg-primary/60 rounded-full ${
        i % 3 === 0 ? "soundwave-bar-slow" : "soundwave-bar"}`
        }
        style={{
          animationDelay: `${i * 0.08}s`,
          height: "8px"
        }} />

      )}
    </div>);

};

const HeroSection = () => {
  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background effects */}
      <img src={studioBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
      <SoundwaveBars />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black gradient-text tracking-tight md:text-6xl mx-[63px] my-[36px] px-[11px]">
            ভোকাল সেবা
          </h2>
          <p className="text-muted-foreground text-sm mt-1 tracking-widest uppercase my-0 md:text-3xl py-0 mx-0 px-0">
            কন্ঠ হোক স্বপ্ন জয়ের ঠিকানা।
          </p>

        </motion.div>

        










        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-3">

          প্রফেশনাল ভয়েস ওভার সার্ভিস — অ্যাডভার্টাইজমেন্ট, ইউটিউব, অডিওবুক, কর্পোরেট ন্যারেশন এবং আরও অনেক কিছু।
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-primary font-bold text-lg md:text-xl mb-8 md:mb-10">

          আপনার কন্টেন্টকে পরবর্তী লেভেলে নিয়ে যান — ২৪ ঘণ্টার মধ্যে ✨
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToCategories}
          className="gold-btn text-lg md:text-xl px-10 py-5 group pulse-glow-btn">

          ভয়েস ক্যাটাগরি দেখুন
          <ChevronDown className="w-5 h-5 inline-block ml-2 group-hover:translate-y-1 transition-transform" />
        </motion.button>

        {/* Social Proof Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-10 md:mt-14">

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
    </section>);

};

export default HeroSection;