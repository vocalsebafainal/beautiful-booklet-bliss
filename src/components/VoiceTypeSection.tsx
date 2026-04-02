import { motion } from "framer-motion";

const voiceTypes = [
  { emoji: "📢", title: "অ্যাড ভয়েস", desc: "টিভি, রেডিও ও ডিজিটাল বিজ্ঞাপনের জন্য আকর্ষণীয় কণ্ঠ" },
  { emoji: "🎬", title: "ইউটিউব ভয়েস", desc: "ভিডিও ন্যারেশন, টিউটোরিয়াল ও ভ্লগের জন্য" },
  { emoji: "📰", title: "নিউজ ভয়েস", desc: "সংবাদ পাঠ, রিপোর্টিং ও ডকুমেন্টারি ন্যারেশন" },
  { emoji: "📖", title: "স্টোরিটেলিং", desc: "গল্প, অডিওবুক ও পডকাস্টের জন্য আবেগময় কণ্ঠ" },
  { emoji: "🕌", title: "ইসলামিক ভয়েস", desc: "ইসলামিক কন্টেন্ট, ওয়াজ ও নাশিদের জন্য" },
  { emoji: "🎭", title: "কার্টুন ভয়েস", desc: "অ্যানিমেশন, কার্টুন ও শিশুদের কন্টেন্টের জন্য" },
  { emoji: "🏢", title: "কর্পোরেট ভয়েস", desc: "IVR, প্রেজেন্টেশন ও কর্পোরেট ভিডিওর জন্য" },
];

const VoiceTypeSection = () => {
  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-4"
        >
          কোন ধরনের ভয়েস দরকার?
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-black gradient-text mb-3"
        >
          আমাদের সেবাসমূহ
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-10"
        >
          যেকোনো ধরনের প্রজেক্টের জন্য প্রফেশনাল বাংলা ভয়েস ওভার সেবা
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {voiceTypes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ y: -6, scale: 1.03 }}
              onClick={scrollToCategories}
              className="glass-card-hover cursor-pointer p-5 md:p-6 flex flex-col items-center text-center gap-2"
            >
              <span className="text-3xl md:text-4xl">{item.emoji}</span>
              <h3 className="font-bold text-sm md:text-base text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceTypeSection;
