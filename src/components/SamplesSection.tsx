import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface CategorySamples {
  name: string;
  emoji: string;
  links: string[];
}

const categorySamples: CategorySamples[] = [
  {
    name: "অ্যাডভার্টাইজমেন্ট ভয়েস",
    emoji: "📢",
    links: [
      "https://ln.run/pSynh", "https://ln.run/L4N6a", "https://ln.run/lyy5J", "https://ln.run/XwfS_", "https://ln.run/Z6ZAA", "https://ln.run/ibP56",
      "https://ln.run/aY6GU", "https://ln.run/VWyY3", "https://ln.run/ZKwFx",
    ],
  },
  {
    name: "ইউটিউব ভয়েস",
    emoji: "🎥",
    links: [
      "https://ln.run/dzH_S", "https://ln.run/MRn4R", "https://ln.run/U57V0", "https://ln.run/MX0UO",
    ],
  },
  {
    name: "নিউজ ভয়েস",
    emoji: "📰",
    links: [
      "https://ln.run/cKr-z", "https://tinyurl.com/28pf7p2p", "https://tinyurl.com/5xbkbd5t", "https://tinyurl.com/2n228yhm", "https://tinyurl.com/45ns35af", "https://tinyurl.com/yefvkvvz",
    ],
  },
  {
    name: "গল্প বলা ও অডিওবুক",
    emoji: "📖",
    links: ["https://tinyurl.com/yfp95359"],
  },
  {
    name: "অ্যানিমেশন ভয়েস",
    emoji: "🎨",
    links: [
      "https://tinyurl.com/mr3un4k9", "https://tinyurl.com/5mryrszw", "https://tinyurl.com/3f5b3zmu",
    ],
  },
  {
    name: "কর্পোরেট ভয়েস",
    emoji: "🏢",
    links: [
      "https://tinyurl.com/ydrj4uc7", "https://tinyurl.com/2fm6mxjj",
    ],
  },
];

const SamplesSection = () => {
  const filtered = categorySamples.filter((c) => c.links.length > 0);

  return (
    <section className="py-16 px-4 md:px-8 bg-background" id="samples">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            🎧 আমাদের স্যাম্পল শুনুন
          </h2>
          <p className="text-muted-foreground text-lg">
            প্রতিটি ক্যাটাগরির জন্য আমাদের কিছু নমুনা কাজ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card rounded-xl p-5 border border-white/10"
            >
              <h3 className="text-lg font-bold text-foreground mb-3">
                {cat.emoji} {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.links.map((link, li) => (
                  <a
                    key={li}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
                  >
                    <ExternalLink className="w-3 h-3" />
                    স্যাম্পল {li + 1}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SamplesSection;
