import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tv, Film, Clapperboard, BookOpen, Bell, MonitorPlay, Phone,
  GraduationCap, Megaphone, Lightbulb, Gamepad2, ScrollText,
  ChevronDown, ChevronUp, Play, ExternalLink, Check
} from "lucide-react";

interface TierInfo {
  name: string;
  label: string;
  price: string;
  priceNum: number;
  limit: string;
  services: string[];
  highlight: boolean;
}

interface VoiceCategory {
  icon: any;
  title: string;
  desc: string;
  sampleLinks: string[][];
  tiers: TierInfo[];
}

const voiceTypes: VoiceCategory[] = [
  {
    icon: Tv, title: "কমার্শিয়াল", desc: "TV / Radio বিজ্ঞাপন",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "৫০ শব্দ", services: ["রেকর্ডিং", "ক্লিন ভয়েস"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "১০০ শব্দ", services: ["রেকর্ডিং", "এডিট", "ব্যাকগ্রাউন্ড মিউজিক"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "২০০ শব্দ", services: ["প্রফেশনাল মিক্সিং", "মিউজিক", "দ্রুত ডেলিভারি"], highlight: false },
    ],
  },
  {
    icon: Film, title: "ন্যারেশন", desc: "ডকুমেন্টারি ও গল্পকথন",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,২০০ টাকা", priceNum: 1200, limit: "১ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "৩ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "৫ মিনিট", services: ["প্রফেশনাল মিক্সিং", "মিউজিক"], highlight: false },
    ],
  },
  {
    icon: Clapperboard, title: "অ্যানিমেশন", desc: "কার্টুন ও মোশন ভিডিও",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "১ চরিত্র", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "২ চরিত্র", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "৩ চরিত্র", services: ["ভয়েস রেকর্ডিং", "সাউন্ড", "প্রফেশনাল মিক্সিং"], highlight: false },
    ],
  },
  {
    icon: BookOpen, title: "অডিও বুক", desc: "বই ও গল্পের অডিও",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "৩ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "৬ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "১০ মিনিট", services: ["ভয়েস রেকর্ডিং", "মিউজিক", "সাউন্ড ডিজাইন"], highlight: false },
    ],
  },
  {
    icon: Bell, title: "এনাউন্সমেন্ট", desc: "অফিস ও ইভেন্ট ঘোষণা",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,০০০ টাকা", priceNum: 1000, limit: "৩০ শব্দ", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "২,০০০ টাকা", priceNum: 2000, limit: "৬০ শব্দ", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৪,০০০ টাকা", priceNum: 4000, limit: "১২০ শব্দ", services: ["প্রফেশনাল মিক্সিং", "মিউজিক"], highlight: false },
    ],
  },
  {
    icon: MonitorPlay, title: "ট্রেইলার", desc: "মুভি ও প্রোডাক্ট ট্রেইলার",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "২,০০০ টাকা", priceNum: 2000, limit: "১ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৪,০০০ টাকা", priceNum: 4000, limit: "২ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট", "মিউজিক"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৭,০০০ টাকা", priceNum: 7000, limit: "৩ মিনিট", services: ["প্রফেশনাল মিক্সিং", "সাউন্ড ডিজাইন", "দ্রুত ডেলিভারি"], highlight: false },
    ],
  },
  {
    icon: Phone, title: "IVR সিস্টেম", desc: "ইন্টারেক্টিভ ভয়েস রেসপন্স",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "৫ প্রম্পট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "১০ প্রম্পট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "২০ প্রম্পট", services: ["প্রফেশনাল রেকর্ডিং", "মিক্সিং"], highlight: false },
    ],
  },
  {
    icon: GraduationCap, title: "ই-লার্নিং", desc: "শিক্ষামূলক কন্টেন্ট",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,০০০ টাকা", priceNum: 1000, limit: "২ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "২,৫০০ টাকা", priceNum: 2500, limit: "৫ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "১০ মিনিট", services: ["ভয়েস রেকর্ডিং", "মিউজিক", "প্রফেশনাল মিক্সিং"], highlight: false },
    ],
  },
  {
    icon: Megaphone, title: "প্রোমো", desc: "ব্র্যান্ড প্রোমোশন",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "৫০ শব্দ", services: ["রেকর্ডিং", "ক্লিন ভয়েস"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "১০০ শব্দ", services: ["রেকর্ডিং", "এডিট", "মিউজিক"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "২০০ শব্দ", services: ["প্রফেশনাল মিক্সিং", "মিউজিক", "দ্রুত ডেলিভারি"], highlight: false },
    ],
  },
  {
    icon: Lightbulb, title: "এক্সপ্লেইনার", desc: "পণ্য ও সেবা ব্যাখ্যা",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,২০০ টাকা", priceNum: 1200, limit: "১ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "৩ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "৫ মিনিট", services: ["প্রফেশনাল মিক্সিং", "মিউজিক", "সাউন্ড ডিজাইন"], highlight: false },
    ],
  },
  {
    icon: Gamepad2, title: "ভিডিও গেমস", desc: "গেম ক্যারেক্টার ভয়েস",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "২,০০০ টাকা", priceNum: 2000, limit: "১ চরিত্র", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৪,০০০ টাকা", priceNum: 4000, limit: "২ চরিত্র", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৭,০০০ টাকা", priceNum: 7000, limit: "৩ চরিত্র", services: ["ভয়েস রেকর্ডিং", "সাউন্ড ডিজাইন", "প্রফেশনাল মিক্সিং"], highlight: false },
    ],
  },
  {
    icon: ScrollText, title: "স্টোরিটেলিং", desc: "ঐতিহাসিক ও সাংস্কৃতিক",
    sampleLinks: [[], [], []],
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "৩ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "৬ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "১০ মিনিট", services: ["ভয়েস রেকর্ডিং", "মিউজিক", "সাউন্ড ডিজাইন"], highlight: false },
    ],
  },
];

interface VoiceTypeSectionProps {
  onTierSelect: (category: string, tier: string, price: number) => void;
}

const VoiceTypeSection = ({ onTierSelect }: VoiceTypeSectionProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (title: string) => {
    setExpandedCategory((prev) => (prev === title ? null : title));
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl lg:text-5xl font-black gradient-text mb-3"
        >
          ভয়েস ওভার ক্যাটাগরি
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-primary text-sm md:text-base max-w-2xl mx-auto mb-10"
        >
          ৫২টিরও বেশি ক্যাটাগরিতে আমরা প্রফেশনাল ভয়েস ওভার প্রদান করি। ক্যাটাগরিতে ক্লিক করে প্যাকেজ দেখুন।
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {voiceTypes.map((item, i) => {
            const isExpanded = expandedCategory === item.title;

            return (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i }}
                className={`relative overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "col-span-2 sm:col-span-3 md:col-span-4 border-primary/50 ring-2 ring-primary/40 gold-glow glass-card-hover rounded-2xl"
                    : "glass-card-hover cursor-pointer rounded-xl border border-primary/20"
                }`}
                onClick={() => !isExpanded && handleCategoryClick(item.title)}
              >
                {/* Category Header */}
                <div
                  className={`p-4 md:p-5 flex flex-col items-center text-center gap-2 ${isExpanded ? "cursor-pointer" : ""}`}
                  onClick={(e) => {
                    if (isExpanded) {
                      e.stopPropagation();
                      handleCategoryClick(item.title);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-7 h-7 md:w-8 md:h-8 text-primary ${isExpanded ? "animate-pulse" : ""}`} />
                    <div className="text-left">
                      <h3 className="font-bold text-xs md:text-sm text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-[10px] md:text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    {isExpanded && (
                      <ChevronUp className="w-5 h-5 text-primary ml-auto" />
                    )}
                  </div>

                  {!isExpanded && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mt-1 flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground"
                    >
                      <span>প্যাকেজ দেখুন</span>
                      <ChevronDown className="w-3 h-3" />
                    </motion.div>
                  )}
                </div>

                {/* Expanded Tier Cards */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                          {item.tiers.map((tier, ti) => (
                            <motion.div
                              key={tier.name}
                              initial={{ opacity: 0, y: 25, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 0.15 + ti * 0.12, type: "spring", damping: 20, stiffness: 150 }}
                              whileHover={{ y: -6, scale: 1.02 }}
                              className={`glass-card p-4 sm:p-5 md:p-6 flex flex-col relative ${
                                tier.highlight ? "shimmer-border ring-1 ring-primary/40" : ""
                              }`}
                            >
                              {tier.highlight && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  transition={{ delay: 0.5, type: "spring", damping: 15 }}
                                  className="absolute right-3 top-3 z-10 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold leading-none text-primary-foreground shadow-lg shadow-primary/30 whitespace-nowrap md:right-4 md:top-4 md:px-3 md:py-1.5 md:text-xs"
                                >
                                  ⭐ জনপ্রিয়
                                </motion.div>
                              )}

                              <div className="text-2xl md:text-3xl mb-2">{tier.label}</div>

                              <div className="text-xl md:text-2xl font-bold text-primary mb-2">
                                {tier.price}
                              </div>

                              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3 w-fit">
                                📏 {tier.limit}
                              </span>

                              <div className="flex-1 space-y-2 mb-6">
                                {tier.services.map((s, si) => (
                                  <motion.div
                                    key={s}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + ti * 0.1 + si * 0.05 }}
                                  >
                                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                    {s}
                                  </motion.div>
                                ))}
                              </div>

                              {/* Sample links */}
                              {item.sampleLinks && item.sampleLinks[ti] && item.sampleLinks[ti].length > 0 && (
                                <div className="mb-4">
                                  <p className="text-xs text-muted-foreground mb-1.5">🔗 স্যাম্পল:</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {item.sampleLinks[ti].map((link, li) => (
                                      <a
                                        key={li}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-xs text-primary hover:text-primary/80 underline underline-offset-2"
                                      >
                                        স্যাম্পল {li + 1}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onTierSelect(item.title, tier.name, tier.priceNum);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                                  tier.highlight
                                    ? "gold-btn"
                                    : "bg-muted text-foreground hover:bg-muted/80"
                                }`}
                              >
                                অর্ডার করুন
                              </motion.button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VoiceTypeSection;
