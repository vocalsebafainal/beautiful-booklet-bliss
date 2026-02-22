import { motion } from "framer-motion";
import { Megaphone, Youtube, Newspaper, BookOpen, Moon, Palette, Building2 } from "lucide-react";

const categories = [
  { icon: Megaphone, name: "অ্যাডভার্টাইজমেন্ট ভয়েস", emoji: "📢", desc: "বিজ্ঞাপন ও প্রমোশনাল কন্টেন্ট" },
  { icon: Youtube, name: "ইউটিউব ভয়েস", emoji: "🎥", desc: "ইউটিউব ভিডিও ন্যারেশন" },
  { icon: Newspaper, name: "নিউজ ও ডকুমেন্টারি", emoji: "📰", desc: "নিউজ রিডিং ও ডকুমেন্টারি" },
  { icon: BookOpen, name: "স্টোরিটেলিং ও অডিওবুক", emoji: "📖", desc: "গল্প বলা ও অডিওবুক রেকর্ডিং" },
  { icon: Moon, name: "ইসলামিক ভয়েস", emoji: "🕌", desc: "ইসলামিক কন্টেন্ট ও ওয়াজ" },
  { icon: Palette, name: "কার্টুন ও ক্যারেক্টার", emoji: "🎨", desc: "কার্টুন ডাবিং ও ক্যারেক্টার ভয়েস" },
  { icon: Building2, name: "কর্পোরেট ভয়েস", emoji: "🏢", desc: "কর্পোরেট প্রেজেন্টেশন ও IVR" },
];

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const CategoryGrid = ({ onCategorySelect }: CategoryGridProps) => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => onCategorySelect(cat.name)}
              className="glass-card-hover p-6 md:p-8 text-left group cursor-pointer"
            >
              <div className="text-3xl md:text-4xl mb-4">{cat.emoji}</div>
              <h3 className="text-foreground font-bold text-base md:text-lg mb-2 group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-muted-foreground text-sm">{cat.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
