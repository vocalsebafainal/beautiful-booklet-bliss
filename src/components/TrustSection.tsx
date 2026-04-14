import { motion } from "framer-motion";
import { Shield, Clock, Headphones, Award, ArrowRight, CheckCircle2, Trophy, BadgeCheck, Star, Flame } from "lucide-react";

const trustItems = [
  { icon: Clock, title: "দ্রুত ডেলিভারি", desc: "১২-৪৮ ঘণ্টার মধ্যে" },
  { icon: Award, title: "টপ কোয়ালিটি", desc: "ইন্ডাস্ট্রি-স্ট্যান্ডার্ড" },
  { icon: Shield, title: "মানি-ব্যাক গ্যারান্টি", desc: "১০০% টাকা ফেরত" },
  { icon: Headphones, title: "২৪/৭ সাপোর্ট", desc: "সবসময় পাশে আছি" },
];

const proofChecklist = [
  "500+ প্রজেক্ট সফলভাবে সম্পন্ন",
  "50+ নিয়মিত রিপিট ক্লায়েন্ট",
  "৯৮% ক্লায়েন্ট সন্তুষ্টি হার",
  "সারাদেশে ১০০+ ব্র্যান্ডের সাথে কাজ",
  "4.9/5 গড় ক্লায়েন্ট রেটিং",
  "রেকর্ড ১২ ঘণ্টায় ডেলিভারি",
];

const awards = [
  { icon: Trophy, label: "Best Voice Agency 2024", sub: "BD Creative Awards" },
  { icon: BadgeCheck, label: "Verified Pro Seller", sub: "Fiverr & Upwork" },
  { icon: Star, label: "Top Rated Plus", sub: "Freelance Platforms" },
  { icon: Flame, label: "Trending Agency", sub: "সোশ্যাল মিডিয়া ২০২৫" },
];

const TrustSection = () => {
  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Subtle bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Trust icons row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-16">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5 text-center hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-foreground font-bold text-sm mb-0.5">{item.title}</h3>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Awards Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-center text-muted-foreground text-xs uppercase tracking-widest mb-5">
            স্বীকৃতি ও অর্জন
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
            {awards.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="flex items-center gap-3 glass-card px-3 py-2.5 sm:px-4 sm:py-3 hover:border-primary/30 transition-all duration-300 w-[calc(50%-10px)] sm:w-auto"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <a.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-foreground text-xs font-bold leading-tight">{a.label}</p>
                  <p className="text-muted-foreground text-[10px]">{a.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Block with Social Proof Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-5 sm:p-8 md:p-12 relative overflow-hidden shimmer-border border-primary/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">
              আজই আপনার <span className="gradient-text">ভয়েস ওভার</span> প্রজেক্ট শুরু করুন
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              সময় নষ্ট করবেন না — প্রতিদিন শত শত কন্টেন্ট ক্রিয়েটর আমাদের উপর ভরসা করছেন।
            </p>
          </div>

          {/* Social proof checklist - 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl mx-auto mb-8">
            {proofChecklist.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{p}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={scrollToCategories}
              className="gold-btn text-base md:text-lg px-10 py-5 group pulse-glow-btn inline-flex items-center gap-2"
            >
              এখনই ক্যাটাগরি বেছে নিন
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-muted-foreground text-xs mt-4">
              🔒 কোনো অগ্রিম পেমেন্ট নেই — আগে শুনুন, তারপর পে করুন
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
