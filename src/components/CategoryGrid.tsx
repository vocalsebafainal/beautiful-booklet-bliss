import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Youtube, Newspaper, BookOpen, Moon, Palette, Building2, Mic, Star, Crown, Check, ChevronDown, ChevronUp } from "lucide-react";

interface TierInfo {
  name: string;
  label: string;
  price: string;
  priceNum: number;
  limit: string;
  services: string[];
  highlight: boolean;
}

interface CategoryInfo {
  icon: any;
  name: string;
  emoji: string;
  desc: string;
  tiers: TierInfo[];
  sampleLinks?: string[][];
}

const categories: CategoryInfo[] = [
  {
    icon: Megaphone,
    name: "অ্যাডভার্টাইজমেন্ট ভয়েস",
    emoji: "📢",
    desc: "বিজ্ঞাপন ও প্রমোশনাল কন্টেন্ট",
    sampleLinks: [
      ["https://ln.run/pSynh", "https://ln.run/L4N6a", "https://ln.run/lyy5J", "https://ln.run/XwfS_", "https://ln.run/Z6ZAA", "https://ln.run/ibP56"],
      ["https://ln.run/aY6GU", "https://ln.run/VWyY3", "https://ln.run/ZKwFx"],
      ["https://ln.run/u5b3F", "https://ln.run/_Kh32", "https://ln.run/GnEaZ"],
    ],
    tiers: [
      {
        name: "Basic",
        label: "🎙 বেসিক",
        price: "১,৫০০ টাকা",
        priceNum: 1500,
        limit: "৫০ শব্দ",
        services: ["রেকর্ডিং", "ক্লিন ভয়েস"],
        highlight: false,
      },
      {
        name: "Standard",
        label: "⭐ স্ট্যান্ডার্ড",
        price: "৩,০০০ টাকা",
        priceNum: 3000,
        limit: "১০০ শব্দ",
        services: ["রেকর্ডিং", "এডিট", "ব্যাকগ্রাউন্ড মিউজিক"],
        highlight: true,
      },
      {
        name: "Premium",
        label: "👑 প্রিমিয়াম",
        price: "৫,০০০ টাকা",
        priceNum: 5000,
        limit: "২০০ শব্দ",
        services: ["প্রফেশনাল মিক্সিং", "মিউজিক", "দ্রুত ডেলিভারি"],
        highlight: false,
      },
    ],
  },
  {
    icon: Youtube,
    name: "ইউটিউব ভয়েস",
    emoji: "🎥",
    desc: "ইউটিউব ভিডিও ন্যারেশন",
    sampleLinks: [
      ["https://ln.run/dzH_S", "https://ln.run/MRn4R", "https://ln.run/U57V0", "https://ln.run/MX0UO"],
      [],
      [],
    ],
    tiers: [
      {
        name: "Basic",
        label: "🎙 বেসিক",
        price: "১,০০০ টাকা",
        priceNum: 1000,
        limit: "২ মিনিট",
        services: ["ভয়েস রেকর্ডিং"],
        highlight: false,
      },
      {
        name: "Standard",
        label: "⭐ স্ট্যান্ডার্ড",
        price: "২,৫০০ টাকা",
        priceNum: 2500,
        limit: "৫ মিনিট",
        services: ["ভয়েস রেকর্ডিং", "এডিট"],
        highlight: true,
      },
      {
        name: "Premium",
        label: "👑 প্রিমিয়াম",
        price: "৫,০০০ টাকা",
        priceNum: 5000,
        limit: "১০ মিনিট",
        services: ["ভয়েস রেকর্ডিং", "মিক্সিং", "ব্যাকগ্রাউন্ড মিউজিক"],
        highlight: false,
      },
    ],
  },
  {
    icon: Newspaper,
    name: "নিউজ ভয়েস ওভার",
    emoji: "📰",
    desc: "নিউজ রিডিং ও ডকুমেন্টারি",
    sampleLinks: [
      ["https://ln.run/cKr-z", "https://tinyurl.com/28pf7p2p", "https://tinyurl.com/5xbkbd5t", "https://tinyurl.com/2n228yhm", "https://tinyurl.com/45ns35af", "https://tinyurl.com/yefvkvvz"],
      [],
      [],
    ],
    tiers: [
      {
        name: "Basic",
        label: "🎙 বেসিক",
        price: "১,২০০ টাকা",
        priceNum: 1200,
        limit: "১ মিনিট",
        services: ["ভয়েস রেকর্ডিং"],
        highlight: false,
      },
      {
        name: "Standard",
        label: "⭐ স্ট্যান্ডার্ড",
        price: "৩,০০০ টাকা",
        priceNum: 3000,
        limit: "৩ মিনিট",
        services: ["ভয়েস রেকর্ডিং", "এডিট"],
        highlight: true,
      },
      {
        name: "Premium",
        label: "👑 প্রিমিয়াম",
        price: "৫,০০০ টাকা",
        priceNum: 5000,
        limit: "৫ মিনিট",
        services: ["প্রফেশনাল নিউজ স্টাইল মিক্সিং"],
        highlight: false,
      },
    ],
  },
  {
    icon: BookOpen,
    name: "স্টোরিটেলিং ভয়েস ওভার",
    emoji: "📖",
    desc: "গল্প বলা ও অডিওবুক রেকর্ডিং",
    sampleLinks: [
      ["https://tinyurl.com/yfp95359"],
      [],
      [],
    ],
    tiers: [
      {
        name: "Basic",
        label: "🎙 বেসিক",
        price: "১,৫০০ টাকা",
        priceNum: 1500,
        limit: "৩ মিনিট",
        services: ["ভয়েস রেকর্ডিং"],
        highlight: false,
      },
      {
        name: "Standard",
        label: "⭐ স্ট্যান্ডার্ড",
        price: "৩,০০০ টাকা",
        priceNum: 3000,
        limit: "৬ মিনিট",
        services: ["ভয়েস রেকর্ডিং", "এডিট"],
        highlight: true,
      },
      {
        name: "Premium",
        label: "👑 প্রিমিয়াম",
        price: "৫,০০০ টাকা",
        priceNum: 5000,
        limit: "১০ মিনিট",
        services: ["ভয়েস রেকর্ডিং", "মিউজিক", "সাউন্ড ডিজাইন"],
        highlight: false,
      },
    ],
  },
  {
    icon: Moon,
    name: "ইসলামিক ভয়েস ওভার",
    emoji: "🕌",
    desc: "ইসলামিক কন্টেন্ট ও ওয়াজ",
    tiers: [
      {
        name: "Basic",
        label: "🎙 বেসিক",
        price: "১,০০০ টাকা",
        priceNum: 1000,
        limit: "২ মিনিট",
        services: ["ভয়েস রেকর্ডিং"],
        highlight: false,
      },
      {
        name: "Standard",
        label: "⭐ স্ট্যান্ডার্ড",
        price: "২,৫০০ টাকা",
        priceNum: 2500,
        limit: "৫ মিনিট",
        services: ["ভয়েস রেকর্ডিং", "এডিট"],
        highlight: true,
      },
      {
        name: "Premium",
        label: "👑 প্রিমিয়াম",
        price: "৫,০০০ টাকা",
        priceNum: 5000,
        limit: "১০ মিনিট",
        services: ["ভয়েস রেকর্ডিং", "মিউজিক", "প্রফেশনাল মিক্সিং"],
        highlight: false,
      },
    ],
  },
  {
    icon: Palette,
    name: "কার্টুন ভয়েস",
    emoji: "🎨",
    desc: "কার্টুন ডাবিং ও ক্যারেক্টার ভয়েস",
    sampleLinks: [
      ["https://tinyurl.com/mr3un4k9", "https://tinyurl.com/5mryrszw", "https://tinyurl.com/3f5b3zmu"],
      [],
      [],
    ],
    tiers: [
      {
        name: "Basic",
        label: "🎙 বেসিক",
        price: "১,৫০০ টাকা",
        priceNum: 1500,
        limit: "১ চরিত্র",
        services: ["ভয়েস রেকর্ডিং"],
        highlight: false,
      },
      {
        name: "Standard",
        label: "⭐ স্ট্যান্ডার্ড",
        price: "৩,০০০ টাকা",
        priceNum: 3000,
        limit: "২ চরিত্র",
        services: ["ভয়েস রেকর্ডিং", "এডিট"],
        highlight: true,
      },
      {
        name: "Premium",
        label: "👑 প্রিমিয়াম",
        price: "৫,০০০ টাকা",
        priceNum: 5000,
        limit: "৩ চরিত্র",
        services: ["ভয়েস রেকর্ডিং", "সাউন্ড", "প্রফেশনাল মিক্সিং"],
        highlight: false,
      },
    ],
  },
  {
    icon: Building2,
    name: "কর্পোরেট ভয়েস ওভার",
    emoji: "🏢",
    desc: "কর্পোরেট প্রেজেন্টেশন ও IVR",
    sampleLinks: [
      ["https://tinyurl.com/ydrj4uc7", "https://tinyurl.com/2fm6mxjj"],
      [],
      [],
    ],
    tiers: [
      {
        name: "Basic",
        label: "🎙 বেসিক",
        price: "১,৫০০ টাকা",
        priceNum: 1500,
        limit: "২ মিনিট",
        services: ["ভয়েস রেকর্ডিং"],
        highlight: false,
      },
      {
        name: "Standard",
        label: "⭐ স্ট্যান্ডার্ড",
        price: "৩,০০০ টাকা",
        priceNum: 3000,
        limit: "৫ মিনিট",
        services: ["ভয়েস রেকর্ডিং", "এডিট"],
        highlight: true,
      },
      {
        name: "Premium",
        label: "👑 প্রিমিয়াম",
        price: "৫,০০০ টাকা",
        priceNum: 5000,
        limit: "১০ মিনিট",
        services: ["ভয়েস রেকর্ডিং", "মিক্সিং", "মিউজিক"],
        highlight: false,
      },
    ],
  },
];

interface CategoryGridProps {
  onTierSelect: (category: string, tier: string, price: number) => void;
}

const CategoryGrid = ({ onTierSelect }: CategoryGridProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0].name);

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory((prev) => prev === categoryName ? null : categoryName);
  };

  return (
    <section id="categories" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            আপনার প্রজেক্টের ধরন অনুযায়ী{" "}
            <motion.span
              className="text-primary inline-block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ক্যাটাগরি
            </motion.span>{" "}বেছে নিন
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            নিচের ক্যাটাগরি থেকে আপনার পছন্দ সিলেক্ট করুন
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {categories.map((cat, index) => {
            const isExpanded = expandedCategory === cat.name;

            return (
              <motion.div
                key={cat.name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                whileHover={!isExpanded ? { scale: 1.04, y: -4 } : {}}
                whileTap={!isExpanded ? { scale: 0.98 } : {}}
                className={`glass-card-hover cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "col-span-1 sm:col-span-2 lg:col-span-3 border-primary/50 ring-2 ring-primary/40 gold-glow"
                    : ""
                }`}
                onClick={() => !isExpanded && handleCategoryClick(cat.name)}
              >
                {/* Card Header */}
                <div
                  className={`p-5 md:p-6 ${isExpanded ? "cursor-pointer" : ""}`}
                  onClick={(e) => {
                    if (isExpanded) {
                      e.stopPropagation();
                      handleCategoryClick(cat.name);
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="text-4xl md:text-5xl"
                      animate={isExpanded ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {cat.emoji}
                    </motion.div>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-foreground font-bold text-sm md:text-base">
                        {cat.name}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm">{cat.desc}</p>
                    </div>
                    {isExpanded && (
                      <div className="hidden md:flex items-center gap-2">
                        <span className="text-sm font-semibold rounded-full px-4 py-1.5 bg-primary text-primary-foreground flex items-center gap-1.5">
                          প্যাকেজ দেখা হচ্ছে ✓
                        </span>
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-3 md:hidden flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary/10 border border-primary/20">
                      <span className="text-sm font-semibold text-primary">প্যাকেজ দেখা হচ্ছে ✓</span>
                      <ChevronUp className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>

                {!isExpanded && (
                  <div className="mx-5 mb-5 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-muted/80 border border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-200">
                    <span className="text-sm font-medium text-muted-foreground">বিস্তারিত জানতে ক্লিক করুন</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}

                {/* Expanded Package Tiers */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                          {cat.tiers.map((tier, i) => (
                            <motion.div
                              key={tier.name}
                              initial={{ opacity: 0, y: 25, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 0.15 + i * 0.12, type: "spring", damping: 20, stiffness: 150 }}
                              whileHover={{ y: -6, scale: 1.02 }}
                              className={`glass-card p-5 md:p-6 flex flex-col relative ${
                                tier.highlight ? "shimmer-border ring-1 ring-primary/40" : ""
                              }`}
                            >
                              {tier.highlight && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  transition={{ delay: 0.5, type: "spring", damping: 15 }}
                                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg shadow-primary/30 whitespace-nowrap py-[3px] px-[19px] mx-[54px] my-[25px]"
                                >
                                  ⭐ জনপ্রিয়
                                </motion.div>
                              )}

                              <div className="text-2xl md:text-3xl mb-2">{tier.label}</div>

                              {/* Price */}
                              <div className="text-xl md:text-2xl font-bold text-primary mb-2">
                                {tier.price}
                              </div>

                              {/* Limit badge */}
                              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3 w-fit">
                                📏 {tier.limit}
                              </span>

                              {/* Services */}
                              <div className="flex-1 space-y-2 mb-6">
                                {tier.services.map((s, si) => (
                                  <motion.div
                                    key={s}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 + si * 0.05 }}
                                  >
                                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                    {s}
                                  </motion.div>
                                ))}
                              </div>

                              {/* Sample links */}
                              {cat.sampleLinks && cat.sampleLinks[i] && cat.sampleLinks[i].length > 0 && (
                                <div className="mb-4">
                                  <p className="text-xs text-muted-foreground mb-1.5">🔗 স্যাম্পল:</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {cat.sampleLinks[i].map((link, li) => (
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
                                  onTierSelect(cat.name, tier.name);
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

export default CategoryGrid;
