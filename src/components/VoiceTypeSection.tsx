import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tv, Film, Clapperboard, BookOpen, Bell, MonitorPlay, Phone,
  GraduationCap, Megaphone, Lightbulb, Gamepad2, ScrollText,
  ChevronDown, ChevronUp, Play, ExternalLink
} from "lucide-react";

interface VoiceCategory {
  icon: any;
  title: string;
  desc: string;
  sampleLinks: string[];
}

const voiceTypes: VoiceCategory[] = [
  { icon: Tv, title: "কমার্শিয়াল", desc: "TV / Radio বিজ্ঞাপন", sampleLinks: [] },
  { icon: Film, title: "ন্যারেশন", desc: "ডকুমেন্টারি ও গল্পকথন", sampleLinks: [] },
  { icon: Clapperboard, title: "অ্যানিমেশন", desc: "কার্টুন ও মোশন ভিডিও", sampleLinks: [] },
  { icon: BookOpen, title: "অডিও বুক", desc: "বই ও গল্পের অডিও", sampleLinks: [] },
  { icon: Bell, title: "এনাউন্সমেন্ট", desc: "অফিস ও ইভেন্ট ঘোষণা", sampleLinks: [] },
  { icon: MonitorPlay, title: "ট্রেইলার", desc: "মুভি ও প্রোডাক্ট ট্রেইলার", sampleLinks: [] },
  { icon: Phone, title: "IVR সিস্টেম", desc: "ইন্টারেক্টিভ ভয়েস রেসপন্স", sampleLinks: [] },
  { icon: GraduationCap, title: "ই-লার্নিং", desc: "শিক্ষামূলক কন্টেন্ট", sampleLinks: [] },
  { icon: Megaphone, title: "প্রোমো", desc: "ব্র্যান্ড প্রোমোশন", sampleLinks: [] },
  { icon: Lightbulb, title: "এক্সপ্লেইনার", desc: "পণ্য ও সেবা ব্যাখ্যা", sampleLinks: [] },
  { icon: Gamepad2, title: "ভিডিও গেমস", desc: "গেম ক্যারেক্টার ভয়েস", sampleLinks: [] },
  { icon: ScrollText, title: "স্টোরিটেলিং", desc: "ঐতিহাসিক ও সাংস্কৃতিক", sampleLinks: [] },
];

const VoiceTypeSection = () => {
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
          ৫২টিরও বেশি ক্যাটাগরিতে আমরা প্রফেশনাল ভয়েস ওভার প্রদান করি। ক্যাটাগরিতে ক্লিক করে স্যাম্পল শুনুন।
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
                      <span>স্যাম্পল দেখুন</span>
                      <ChevronDown className="w-3 h-3" />
                    </motion.div>
                  )}
                </div>

                {/* Expanded Sample Links */}
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
                        {item.sampleLinks.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {item.sampleLinks.map((link, idx) => (
                              <motion.a
                                key={idx}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.1 + idx * 0.08, type: "spring", damping: 20 }}
                                whileHover={{ y: -4, scale: 1.03 }}
                                className="glass-card p-4 flex flex-col items-center gap-2 group hover:border-primary/40 transition-all"
                              >
                                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                                  <Play className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-xs font-semibold text-foreground">স্যাম্পল {idx + 1}</span>
                                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                              </motion.a>
                            ))}
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-6"
                          >
                            <p className="text-muted-foreground text-sm">স্যাম্পল শীঘ্রই আসছে...</p>
                          </motion.div>
                        )}
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
