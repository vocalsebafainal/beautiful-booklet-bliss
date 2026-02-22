import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Youtube, Newspaper, BookOpen, Moon, Palette, Building2, Mic, Star, Crown, Check } from "lucide-react";

const categories = [
  { icon: Megaphone, name: "অ্যাডভার্টাইজমেন্ট ভয়েস", emoji: "📢", desc: "বিজ্ঞাপন ও প্রমোশনাল কন্টেন্ট" },
  { icon: Youtube, name: "ইউটিউব ভয়েস", emoji: "🎥", desc: "ইউটিউব ভিডিও ন্যারেশন" },
  { icon: Newspaper, name: "নিউজ ও ডকুমেন্টারি", emoji: "📰", desc: "নিউজ রিডিং ও ডকুমেন্টারি" },
  { icon: BookOpen, name: "স্টোরিটেলিং ও অডিওবুক", emoji: "📖", desc: "গল্প বলা ও অডিওবুক রেকর্ডিং" },
  { icon: Moon, name: "ইসলামিক ভয়েস", emoji: "🕌", desc: "ইসলামিক কন্টেন্ট ও ওয়াজ" },
  { icon: Palette, name: "কার্টুন ও ক্যারেক্টার", emoji: "🎨", desc: "কার্টুন ডাবিং ও ক্যারেক্টার ভয়েস" },
  { icon: Building2, name: "কর্পোরেট ভয়েস", emoji: "🏢", desc: "কর্পোরেট প্রেজেন্টেশন ও IVR" },
];

const tiers = [
  {
    icon: Mic,
    name: "Basic",
    label: "🎙 বেসিক",
    target: "পার্সোনাল প্রজেক্ট",
    delivery: "২৪-৪৮ ঘণ্টা ডেলিভারি",
    revisions: "১ বার রিভিশন",
    features: ["ক্লিন অডিও", "স্ট্যান্ডার্ড কোয়ালিটি", "MP3 ফরম্যাট"],
    highlight: false,
  },
  {
    icon: Star,
    name: "Standard",
    label: "⭐ স্ট্যান্ডার্ড",
    target: "প্রফেশনাল কন্টেন্ট",
    delivery: "২৪ ঘণ্টা ডেলিভারি",
    revisions: "৩ বার রিভিশন",
    features: ["ক্লিন অডিও", "হাই কোয়ালিটি", "MP3 + WAV ফরম্যাট", "ব্যাকগ্রাউন্ড মিউজিক"],
    highlight: true,
  },
  {
    icon: Crown,
    name: "Pro",
    label: "👑 প্রো",
    target: "হাই-এন্ড ব্র্যান্ড",
    delivery: "১২ ঘণ্টা সুপার-ফাস্ট",
    revisions: "আনলিমিটেড রিভিশন",
    features: ["প্রিমিয়াম অডিও", "সর্বোচ্চ কোয়ালিটি", "সব ফরম্যাট", "ব্যাকগ্রাউন্ড মিউজিক", "প্রায়োরিটি সাপোর্ট"],
    highlight: false,
  },
];

interface CategoryGridProps {
  onTierSelect: (category: string, tier: string) => void;
}

const CategoryGrid = ({ onTierSelect }: CategoryGridProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <section id="categories" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            আপনার প্রজেক্টের ধরন অনুযায়ী{" "}
            <span className="text-primary">ক্যাটাগরি</span> বেছে নিন
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            নিচের ক্যাটাগরি থেকে আপনার পছন্দ সিলেক্ট করুন
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <div key={cat.name}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleCategoryClick(cat.name)}
                className={`glass-card-hover w-full p-5 md:p-6 text-left group cursor-pointer flex items-center gap-4 md:gap-6 transition-all duration-300 ${
                  expandedCategory === cat.name
                    ? "border-primary/50 ring-1 ring-primary/30"
                    : ""
                }`}
              >
                <div className="text-3xl md:text-4xl shrink-0">{cat.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-bold text-base md:text-lg group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{cat.desc}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedCategory === cat.name ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedCategory === cat.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 pb-2">
                      {tiers.map((tier, i) => (
                        <motion.div
                          key={tier.name}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`glass-card p-5 md:p-6 flex flex-col relative ${
                            tier.highlight ? "border-primary/50 ring-1 ring-primary/30" : ""
                          }`}
                        >
                          {tier.highlight && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                              জনপ্রিয়
                            </div>
                          )}
                          <div className="text-2xl mb-3">{tier.label}</div>
                          <p className="text-muted-foreground text-sm mb-1">{tier.target}</p>
                          <p className="text-secondary text-sm font-medium mb-1">{tier.delivery}</p>
                          <p className="text-foreground text-sm font-semibold mb-4">{tier.revisions}</p>

                          <div className="flex-1 space-y-2 mb-6">
                            {tier.features.map((f) => (
                              <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                {f}
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => onTierSelect(cat.name, tier.name)}
                            className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                              tier.highlight
                                ? "gold-btn"
                                : "bg-muted text-foreground hover:bg-muted/80"
                            }`}
                          >
                            অডার করুন
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
