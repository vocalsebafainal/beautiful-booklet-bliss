import { motion } from "framer-motion";
import { Tv, Film, Clapperboard, BookOpen, Bell, MonitorPlay, Phone, GraduationCap, Megaphone, Lightbulb, Gamepad2, ScrollText } from "lucide-react";

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

const VoiceTypeSection = () => {
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
      </div>
    </section>
  );
};

export default VoiceTypeSection;
