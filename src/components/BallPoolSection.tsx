import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const categories = [
  { emoji: "📢", name: "অ্যাডভার্টাইজমেন্ট", desc: "বিজ্ঞাপন ও প্রমোশনাল কন্টেন্টের জন্য প্রফেশনাল ভয়েস", size: "lg" },
  { emoji: "🎥", name: "ইউটিউব", desc: "ইউটিউব ভিডিও ন্যারেশন ও ভয়েসওভার", size: "md" },
  { emoji: "📰", name: "নিউজ", desc: "নিউজ রিডিং ও ডকুমেন্টারি ন্যারেশন", size: "sm" },
  { emoji: "📖", name: "স্টোরিটেলিং", desc: "গল্প বলা ও অডিওবুক রেকর্ডিং", size: "md" },
  { emoji: "🕌", name: "ইসলামিক", desc: "ইসলামিক কন্টেন্ট, ওয়াজ ও তেলাওয়াত", size: "sm" },
  { emoji: "🎨", name: "কার্টুন", desc: "কার্টুন ডাবিং ও ক্যারেক্টার ভয়েস", size: "lg" },
  { emoji: "🏢", name: "কর্পোরেট", desc: "কর্পোরেট প্রেজেন্টেশন ও IVR সিস্টেম", size: "md" },
];

const floatVariants = [
  { y: [0, -12, 0], rotate: [0, 3, -3, 0], duration: 4.5 },
  { y: [0, -8, 0], rotate: [0, -2, 2, 0], duration: 5.2 },
  { y: [0, -15, 0], rotate: [0, 4, -4, 0], duration: 3.8 },
  { y: [0, -10, 0], rotate: [0, -3, 3, 0], duration: 4.0 },
  { y: [0, -14, 0], rotate: [0, 2, -2, 0], duration: 5.5 },
  { y: [0, -9, 0], rotate: [0, -4, 4, 0], duration: 4.2 },
  { y: [0, -11, 0], rotate: [0, 3, -3, 0], duration: 4.8 },
];

const sizeMap = {
  sm: "w-24 h-24 md:w-28 md:h-28 text-3xl",
  md: "w-28 h-28 md:w-32 md:h-32 text-4xl",
  lg: "w-32 h-32 md:w-36 md:h-36 text-5xl",
};

const BallPoolSection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            কোন ধরনের <span className="text-primary">ভয়েস</span> দরকার?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            বাবলে ক্লিক করে বিস্তারিত জানুন
          </p>
        </motion.div>

        {/* Bubbles */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
          {categories.map((cat, i) => {
            const fv = floatVariants[i];
            const isSelected = selected === i;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: i * 0.1,
                }}
                animate={{
                  y: isSelected ? 0 : fv.y,
                  rotate: isSelected ? 0 : fv.rotate,
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(isSelected ? null : i)}
                className={`${sizeMap[cat.size as keyof typeof sizeMap]} 
                  rounded-full cursor-pointer flex flex-col items-center justify-center
                  border-2 transition-all duration-300 select-none
                  ${isSelected
                    ? "border-primary bg-primary/15 ring-4 ring-primary/30 gold-glow"
                    : "border-border bg-card/80 hover:border-primary/50 hover:bg-primary/5"
                  }
                `}
                style={{
                  transition: "box-shadow 0.3s, background 0.3s",
                }}
              >
                <span className="leading-none">{cat.emoji}</span>
                <span className="text-[10px] md:text-xs font-semibold text-foreground mt-1 leading-tight text-center px-1">
                  {cat.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded detail */}
        <AnimatePresence mode="wait">
          {selected !== null && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="overflow-hidden"
            >
              <div className="glass-card mt-8 p-6 md:p-8 text-center relative max-w-2xl mx-auto">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                >
                  <X size={18} />
                </button>

                <div className="text-5xl mb-3">{categories[selected].emoji}</div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {categories[selected].name} ভয়েস
                </h3>
                <p className="text-muted-foreground mb-5 text-sm md:text-base">
                  {categories[selected].desc}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="gold-btn px-8 py-3 rounded-xl font-bold text-sm"
                >
                  প্যাকেজ দেখুন →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BallPoolSection;
