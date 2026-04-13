import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Tv, Film, Clapperboard, BookOpen, Bell, MonitorPlay, Phone,
  GraduationCap, Megaphone, Lightbulb, Gamepad2, ScrollText,
  ChevronDown
} from "lucide-react";

const voiceTypes = [
  { icon: Tv, title: "কমার্শিয়াল", desc: "TV / Radio বিজ্ঞাপন" },
  { icon: Film, title: "ন্যারেশন", desc: "ডকুমেন্টারি ও গল্পকথন" },
  { icon: Clapperboard, title: "অ্যানিমেশন", desc: "কার্টুন ও মোশন ভিডিও" },
  { icon: BookOpen, title: "অডিও বুক", desc: "বই ও গল্পের অডিও" },
  { icon: Bell, title: "এনাউন্সমেন্ট", desc: "অফিস ও ইভেন্ট ঘোষণা" },
  { icon: MonitorPlay, title: "ট্রেইলার", desc: "মুভি ও প্রোডাক্ট ট্রেইলার" },
  { icon: Phone, title: "IVR সিস্টেম", desc: "ইন্টারেক্টিভ ভয়েস রেসপন্স" },
  { icon: GraduationCap, title: "ই-লার্নিং", desc: "শিক্ষামূলক কন্টেন্ট" },
  { icon: Megaphone, title: "প্রোমো", desc: "ব্র্যান্ড প্রোমোশন" },
  { icon: Lightbulb, title: "এক্সপ্লেইনার", desc: "পণ্য ও সেবা ব্যাখ্যা" },
  { icon: Gamepad2, title: "ভিডিও গেমস", desc: "গেম ক্যারেক্টার ভয়েস" },
  { icon: ScrollText, title: "স্টোরিটেলিং", desc: "ঐতিহাসিক ও সাংস্কৃতিক" },
];

// Categories from 1st photo — shown as expandable cards
const categoryCards = [
  { emoji: "📢", name: "অ্যাডভার্টাইজমেন্ট ভয়েস", desc: "বিজ্ঞাপন ও প্রমোশনাল কন্টেন্ট" },
  { emoji: "🎥", name: "ইউটিউব ভয়েস", desc: "ইউটিউব ভিডিও ন্যারেশন" },
  { emoji: "📰", name: "নিউজ ভয়েস ওভার", desc: "নিউজ রিডিং ও ডকুমেন্টারি" },
  { emoji: "📖", name: "স্টোরিটেলিং ভয়েস ওভার", desc: "গল্প বলা ও অডিওবুক রেকর্ডিং" },
  { emoji: "🕌", name: "ইসলামিক ভয়েস ওভার", desc: "ইসলামিক কন্টেন্ট ও ওয়াজ" },
  { emoji: "🎨", name: "কার্টুন ভয়েস", desc: "কার্টুন ডাবিং ও ক্যারেক্টার ভয়েস" },
  { emoji: "🏢", name: "কর্পোরেট ভয়েস ওভার", desc: "কর্পোরেট প্রেজেন্টেশন ও IVR" },
];

const VoiceTypeSection = () => {
  const navigate = useNavigate();

  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
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
          ৫২টিরও বেশি ক্যাটাগরিতে আমরা প্রফেশনাল ভয়েস ওভার প্রদান করি।
        </motion.p>

        {/* Icon grid — row 1 (7 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
          {voiceTypes.slice(0, 7).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 * i }}
              whileHover={{ y: -4, scale: 1.04 }}
              onClick={scrollToCategories}
              className="glass-card-hover cursor-pointer p-4 md:p-5 flex flex-col items-center text-center gap-2 rounded-xl border border-primary/20"
            >
              <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              <h3 className="font-bold text-xs md:text-sm text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-[10px] md:text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Icon grid — row 2 (5 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mt-3 md:mt-4">
          {voiceTypes.slice(7).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 * (i + 7) }}
              whileHover={{ y: -4, scale: 1.04 }}
              onClick={scrollToCategories}
              className="glass-card-hover cursor-pointer p-4 md:p-5 flex flex-col items-center text-center gap-2 rounded-xl border border-primary/20"
            >
              <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              <h3 className="font-bold text-xs md:text-sm text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-[10px] md:text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Category cards from 1st photo */}
        <div className="mt-12 md:mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold text-foreground mb-2"
          >
            আপনার প্রজেক্টের ধরন অনুযায়ী{" "}
            <span className="text-primary">ক্যাটাগরি</span> বেছে নিন
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm mb-8"
          >
            নিচের ক্যাটাগরি থেকে আপনার পছন্দ সিলেক্ট করুন
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryCards.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToCategories}
                className="glass-card-hover cursor-pointer rounded-2xl border border-border/50 p-5 md:p-6 text-left"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{cat.emoji}</span>
                  <div>
                    <h4 className="font-bold text-foreground text-sm md:text-base">{cat.name}</h4>
                    <p className="text-muted-foreground text-xs">{cat.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted/80 border border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all">
                  <span className="text-sm font-medium text-muted-foreground">বিস্তারিত জানতে ক্লিক করুন</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceTypeSection;
