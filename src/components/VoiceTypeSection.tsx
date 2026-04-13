import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tv, Film, Clapperboard, BookOpen, Bell, MonitorPlay, Phone,
  GraduationCap, Megaphone, Lightbulb, Gamepad2, ScrollText,
  ChevronDown, ChevronUp, Check, Star, Crown, Mic
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
  tiers: TierInfo[];
}

const voiceTypes: VoiceCategory[] = [
  {
    icon: Tv, title: "কমার্শিয়াল", desc: "TV / Radio বিজ্ঞাপন",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "৫০ শব্দ", services: ["রেকর্ডিং", "ক্লিন ভয়েস"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "১০০ শব্দ", services: ["রেকর্ডিং", "এডিট", "ব্যাকগ্রাউন্ড মিউজিক"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "২০০ শব্দ", services: ["প্রফেশনাল মিক্সিং", "মিউজিক", "দ্রুত ডেলিভারি"], highlight: false },
    ],
  },
  {
    icon: Film, title: "ন্যারেশন", desc: "ডকুমেন্টারি ও গল্পকথন",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,২০০ টাকা", priceNum: 1200, limit: "২ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "২,৮০০ টাকা", priceNum: 2800, limit: "৫ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,৫০০ টাকা", priceNum: 5500, limit: "১০ মিনিট", services: ["প্রফেশনাল মিক্সিং", "মিউজিক", "সাউন্ড ডিজাইন"], highlight: false },
    ],
  },
  {
    icon: Clapperboard, title: "অ্যানিমেশন", desc: "কার্টুন ও মোশন ভিডিও",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৮০০ টাকা", priceNum: 1800, limit: "১ চরিত্র", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,৫০০ টাকা", priceNum: 3500, limit: "২ চরিত্র", services: ["ভয়েস রেকর্ডিং", "ইমোশন এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৬,০০০ টাকা", priceNum: 6000, limit: "৩ চরিত্র", services: ["ভয়েস রেকর্ডিং", "সাউন্ড", "মিক্সিং"], highlight: false },
    ],
  },
  {
    icon: BookOpen, title: "অডিও বুক", desc: "বই ও গল্পের অডিও",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "২,০০০ টাকা", priceNum: 2000, limit: "৫ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৪,০০০ টাকা", priceNum: 4000, limit: "১৫ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট", "চ্যাপ্টার মার্কিং"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৭,০০০ টাকা", priceNum: 7000, limit: "৩০ মিনিট", services: ["প্রফেশনাল মিক্সিং", "মিউজিক", "দ্রুত ডেলিভারি"], highlight: false },
    ],
  },
  {
    icon: Bell, title: "এনাউন্সমেন্ট", desc: "অফিস ও ইভেন্ট ঘোষণা",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "৮০০ টাকা", priceNum: 800, limit: "৩০ শব্দ", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "১,৫০০ টাকা", priceNum: 1500, limit: "৬০ শব্দ", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৩,০০০ টাকা", priceNum: 3000, limit: "১০০ শব্দ", services: ["রেকর্ডিং", "মিউজিক", "মিক্সিং"], highlight: false },
    ],
  },
  {
    icon: MonitorPlay, title: "ট্রেইলার", desc: "মুভি ও প্রোডাক্ট ট্রেইলার",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "২,০০০ টাকা", priceNum: 2000, limit: "৩০ সেকেন্ড", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৪,০০০ টাকা", priceNum: 4000, limit: "১ মিনিট", services: ["ভয়েস রেকর্ডিং", "ড্রামাটিক এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৭,০০০ টাকা", priceNum: 7000, limit: "২ মিনিট", services: ["সিনেমাটিক মিক্সিং", "SFX", "মিউজিক"], highlight: false },
    ],
  },
  {
    icon: Phone, title: "IVR সিস্টেম", desc: "ইন্টারেক্টিভ ভয়েস রেসপন্স",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,০০০ টাকা", priceNum: 1000, limit: "৫টি প্রম্পট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "২,৫০০ টাকা", priceNum: 2500, limit: "১০টি প্রম্পট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "২০টি প্রম্পট", services: ["রেকর্ডিং", "মিউজিক", "ফরম্যাটিং"], highlight: false },
    ],
  },
  {
    icon: GraduationCap, title: "ই-লার্নিং", desc: "শিক্ষামূলক কন্টেন্ট",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,২০০ টাকা", priceNum: 1200, limit: "৩ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "৮ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,৫০০ টাকা", priceNum: 5500, limit: "১৫ মিনিট", services: ["রেকর্ডিং", "মিক্সিং", "দ্রুত ডেলিভারি"], highlight: false },
    ],
  },
  {
    icon: Megaphone, title: "প্রোমো", desc: "ব্র্যান্ড প্রোমোশন",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "৫০ শব্দ", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "১০০ শব্দ", services: ["ভয়েস রেকর্ডিং", "এডিট", "মিউজিক"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "২০০ শব্দ", services: ["প্রফেশনাল মিক্সিং", "SFX", "দ্রুত ডেলিভারি"], highlight: false },
    ],
  },
  {
    icon: Lightbulb, title: "এক্সপ্লেইনার", desc: "পণ্য ও সেবা ব্যাখ্যা",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "২ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,৫০০ টাকা", priceNum: 3500, limit: "৫ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৬,০০০ টাকা", priceNum: 6000, limit: "১০ মিনিট", services: ["প্রফেশনাল মিক্সিং", "মিউজিক", "SFX"], highlight: false },
    ],
  },
  {
    icon: Gamepad2, title: "ভিডিও গেমস", desc: "গেম ক্যারেক্টার ভয়েস",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "২,০০০ টাকা", priceNum: 2000, limit: "১ চরিত্র", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৪,০০০ টাকা", priceNum: 4000, limit: "২ চরিত্র", services: ["ভয়েস রেকর্ডিং", "ইমোশন এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৭,০০০ টাকা", priceNum: 7000, limit: "৩ চরিত্র", services: ["রেকর্ডিং", "SFX", "প্রফেশনাল মিক্সিং"], highlight: false },
    ],
  },
  {
    icon: ScrollText, title: "স্টোরিটেলিং", desc: "ঐতিহাসিক ও সাংস্কৃতিক",
    tiers: [
      { name: "Basic", label: "🎙 বেসিক", price: "১,৫০০ টাকা", priceNum: 1500, limit: "৩ মিনিট", services: ["ভয়েস রেকর্ডিং"], highlight: false },
      { name: "Standard", label: "⭐ স্ট্যান্ডার্ড", price: "৩,০০০ টাকা", priceNum: 3000, limit: "৬ মিনিট", services: ["ভয়েস রেকর্ডিং", "এডিট"], highlight: true },
      { name: "Premium", label: "👑 প্রিমিয়াম", price: "৫,০০০ টাকা", priceNum: 5000, limit: "১০ মিনিট", services: ["রেকর্ডিং", "মিউজিক", "সাউন্ড ডিজাইন"], highlight: false },
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
          ৫২টিরও বেশি ক্যাটাগরিতে আমরা প্রফেশনাল ভয়েস ওভার প্রদান করি। ক্যাটাগরিতে ক্লিক করে প্রাইসিং দেখুন।
        </motion.p>

        {/* Category Grid */}
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
                      <span>প্রাইসিং দেখুন</span>
                      <ChevronDown className="w-3 h-3" />
                    </motion.div>
                  )}
                </div>

                {/* Expanded Pricing Tiers */}
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                          {item.tiers.map((tier, ti) => (
                            <motion.div
                              key={tier.name}
                              initial={{ opacity: 0, y: 25, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 0.15 + ti * 0.12, type: "spring", damping: 20, stiffness: 150 }}
                              whileHover={{ y: -6, scale: 1.02 }}
                              className={`glass-card p-5 md:p-6 flex flex-col relative ${
                                tier.highlight ? "shimmer-border ring-1 ring-primary/40" : ""
                              }`}
                            >
                              {tier.highlight && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.5, type: "spring", damping: 15 }}
                                  className="absolute right-3 top-3 z-10 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-lg shadow-primary/30"
                                >
                                  জনপ্রিয় ⭐
                                </motion.div>
                              )}

                              <h4 className="text-base md:text-lg font-bold text-foreground mb-1">{tier.label}</h4>
                              <div className="text-2xl md:text-3xl font-black text-primary mb-1">{tier.price}</div>
                              <p className="text-xs text-muted-foreground mb-4">সর্বোচ্চ {tier.limit}</p>

                              <ul className="space-y-2 mb-5 flex-1">
                                {tier.services.map((s) => (
                                  <li key={s} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                    {s}
                                  </li>
                                ))}
                              </ul>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onTierSelect(item.title, tier.name, tier.priceNum);
                                }}
                                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                                  tier.highlight
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50"
                                    : "bg-muted hover:bg-primary/10 text-foreground border border-border"
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
