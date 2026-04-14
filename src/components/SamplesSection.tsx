import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";

const getYouTubeEmbedUrl = (url: string): string | null => {
  let videoId: string | null = null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      videoId = u.searchParams.get("v");
      if (!videoId && u.pathname.startsWith("/shorts/")) {
        videoId = u.pathname.split("/shorts/")[1];
      }
    } else if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.slice(1);
    }
  } catch { /* not a valid URL */ }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
};

const isEmbeddable = (url: string): boolean => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

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
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const filtered = categorySamples.filter((c) => c.links.length > 0);

  return (
    <>
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
                className="glass-card rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {cat.emoji} {cat.name}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3">
                  {cat.links.map((link, li) => (
                    <button
                      key={li}
                      onClick={() => setActiveVideo(link)}
                      className="group flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-2.5 sm:p-4 rounded-lg bg-primary/5 hover:bg-primary/15 border border-primary/10 hover:border-primary/30 transition-all duration-200 hover:scale-105"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center transition-colors">
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        স্যাম্পল {li + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Popup */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <iframe
              src={activeVideo}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SamplesSection;
