import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Youtube, Newspaper, BookOpen, Moon, Palette, Building2, Mic, Star, Crown, Check, ChevronDown, ChevronUp } from "lucide-react";

const categories = [
{ icon: Megaphone, name: "অ্যাডভার্টাইজমেন্ট ভয়েস", emoji: "📢", desc: "বিজ্ঞাপন ও প্রমোশনাল কন্টেন্ট" },
{ icon: Youtube, name: "ইউটিউব ভয়েস", emoji: "🎥", desc: "ইউটিউব ভিডিও ন্যারেশন" },
{ icon: Newspaper, name: "নিউজ ও ডকুমেন্টারি", emoji: "📰", desc: "নিউজ রিডিং ও ডকুমেন্টারি" },
{ icon: BookOpen, name: "স্টোরিটেলিং ও অডিওবুক", emoji: "📖", desc: "গল্প বলা ও অডিওবুক রেকর্ডিং" },
{ icon: Moon, name: "ইসলামিক ভয়েস", emoji: "🕌", desc: "ইসলামিক কন্টেন্ট ও ওয়াজ" },
{ icon: Palette, name: "কার্টুন ও ক্যারেক্টার", emoji: "🎨", desc: "কার্টুন ডাবিং ও ক্যারেক্টার ভয়েস" },
{ icon: Building2, name: "কর্পোরেট ভয়েস", emoji: "🏢", desc: "কর্পোরেট প্রেজেন্টেশন ও IVR" }];


const tiers = [
{
  icon: Mic,
  name: "Basic",
  label: "🎙 বেসিক",
  target: "পার্সোনাল প্রজেক্ট",
  value: "সবচেয়ে সাশ্রয়ী",
  delivery: "২৪-৪৮ ঘণ্টা ডেলিভারি",
  revisions: "১ বার রিভিশন",
  features: ["ক্লিন অডিও", "স্ট্যান্ডার্ড কোয়ালিটি", "MP3 ফরম্যাট"],
  highlight: false
},
{
  icon: Star,
  name: "Standard",
  label: "⭐ স্ট্যান্ডার্ড",
  target: "প্রফেশনাল কন্টেন্ট",
  value: "সেরা মূল্য",
  delivery: "২৪ ঘণ্টা ডেলিভারি",
  revisions: "৩ বার রিভিশন",
  features: ["ক্লিন অডিও", "হাই কোয়ালিটি", "MP3 + WAV ফরম্যাট", "ব্যাকগ্রাউন্ড মিউজিক"],
  highlight: true
},
{
  icon: Crown,
  name: "Pro",
  label: "👑 প্রো",
  target: "হাই-এন্ড ব্র্যান্ড",
  value: "প্রিমিয়াম",
  delivery: "১২ ঘণ্টা সুপার-ফাস্ট",
  revisions: "আনলিমিটেড রিভিশন",
  features: ["প্রিমিয়াম অডিও", "সর্বোচ্চ কোয়ালিটি", "সব ফরম্যাট", "ব্যাকগ্রাউন্ড মিউজিক", "প্রায়োরিটি সাপোর্ট"],
  highlight: false
}];


interface CategoryGridProps {
  onTierSelect: (category: string, tier: string) => void;
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            আপনার প্রজেক্টের ধরন অনুযায়ী{" "}
            <span className="text-primary">ক্যাটাগরি</span> বেছে নিন
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            নিচের ক্যাটাগরি থেকে আপনার পছন্দ সিলেক্ট করুন
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {categories.map((cat, index) => {
            const isExpanded = expandedCategory === cat.name;

            return (
              <motion.div
                key={cat.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`glass-card-hover cursor-pointer relative overflow-hidden transition-all duration-300 ${
                isExpanded ?
                "col-span-1 sm:col-span-2 lg:col-span-3 border-primary/50 ring-2 ring-primary/40 gold-glow" :
                "hover:scale-[1.02]"}`
                }
                onClick={() => !isExpanded && handleCategoryClick(cat.name)}>

                {/* Card Header */}
                <div
                  className={`p-5 md:p-6 ${isExpanded ? "cursor-pointer" : ""}`}
                  onClick={(e) => {
                    if (isExpanded) {
                      e.stopPropagation();
                      handleCategoryClick(cat.name);
                    }
                  }}>

                  <div className="flex items-center gap-4">
                    <div className="text-4xl md:text-5xl">{cat.emoji}</div>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-foreground font-bold text-sm md:text-base">
                        {cat.name}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm">{cat.desc}</p>
                    </div>
                    {/* Desktop-only inline badges */}
                    {isExpanded &&
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-sm font-semibold rounded-full px-4 py-1.5 bg-primary text-primary-foreground flex items-center gap-1.5">
                          প্যাকেজ দেখা হচ্ছে ✓
                        </span>
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      </div>
                    }
                  </div>

                  {/* Mobile-only expanded badge */}
                  {isExpanded &&
                  <div className="mt-3 md:hidden flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary/10 border border-primary/20">
                      <span className="text-sm font-semibold text-primary">প্যাকেজ দেখা হচ্ছে ✓</span>
                      <ChevronUp className="w-4 h-4 text-primary" />
                    </div>
                  }
                </div>

                {/* Unified collapsed button at bottom center */}
                {!isExpanded &&
                <div className="mx-5 mb-5 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-muted/80 border border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-200">
                    <span className="text-sm font-medium text-muted-foreground">বিস্তারিত জানতে ক্লিক করুন</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                }

                {/* Expanded Package Tiers */}
                <AnimatePresence>
                  {isExpanded &&
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="overflow-hidden">

                      <div className="px-5 md:px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                          {tiers.map((tier, i) =>
                        <motion.div
                          key={tier.name}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`glass-card p-5 md:p-6 flex flex-col relative ${
                          tier.highlight ? "shimmer-border ring-1 ring-primary/40" : ""}`
                          }>

                              {tier.highlight &&
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-primary text-primary-foreground text-xs font-bold rounded-full px-4 py-1 shadow-lg shadow-primary/30 whitespace-nowrap my-[22px] mx-[101px]">
                                  ⭐ জনপ্রিয়
                                </div>
                          }
                              <div className="text-2xl md:text-3xl mb-2">{tier.label}</div>
                              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3 w-fit">
                                {tier.value}
                              </span>
                              <p className="text-muted-foreground text-sm mb-1">{tier.target}</p>
                              <p className="text-secondary text-sm font-medium mb-1">{tier.delivery}</p>
                              <p className="text-foreground text-sm font-semibold mb-4">{tier.revisions}</p>

                              <div className="flex-1 space-y-2 mb-6">
                                {tier.features.map((f) =>
                            <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                    {f}
                                  </div>
                            )}
                              </div>

                              <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onTierSelect(cat.name, tier.name);
                            }}
                            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                            tier.highlight ?
                            "gold-btn" :
                            "bg-muted text-foreground hover:bg-muted/80"}`
                            }>

                                অর্ডার করুন
                              </button>
                            </motion.div>
                        )}
                        </div>
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              </motion.div>);

          })}
        </div>
      </div>
    </section>);

};

export default CategoryGrid;