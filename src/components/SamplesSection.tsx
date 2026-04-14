import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const getYouTubeVideoId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/shorts/")[1]?.split("?")[0];
    } else if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1).split("?")[0];
    }
  } catch {}
  return null;
};

const isYouTubeLink = (url: string): boolean => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

interface GroupedCategory {
  name: string;
  emoji: string;
  links: string[];
}

const SamplesSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { data: samples = [] } = useQuery({
    queryKey: ["samples"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("samples")
        .select("*")
        .eq("is_active", true)
        .order("category_name")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  // Group by category
  const grouped: GroupedCategory[] = [];
  const seen = new Map<string, number>();
  for (const s of samples) {
    const idx = seen.get(s.category_name);
    if (idx !== undefined) {
      grouped[idx].links.push(s.video_url);
    } else {
      seen.set(s.category_name, grouped.length);
      grouped.push({ name: s.category_name, emoji: s.category_emoji, links: [s.video_url] });
    }
  }

  const handleClick = (link: string) => {
    const videoId = getYouTubeVideoId(link);
    if (videoId) {
      setActiveVideo(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  if (grouped.length === 0) return null;

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
            {grouped.map((cat, idx) => (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.links.map((link, li) => {
                    const videoId = getYouTubeVideoId(link);
                    const isYT = isYouTubeLink(link);
                    const thumbUrl = videoId
                      ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
                      : null;

                    return (
                      <button
                        key={li}
                        onClick={() => handleClick(link)}
                        className="group relative aspect-video rounded-lg overflow-hidden border border-primary/10 hover:border-primary/40 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      >
                        {thumbUrl ? (
                          <img
                            src={thumbUrl}
                            alt={`${cat.name} স্যাম্পল ${li + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <span className="text-2xl">{cat.emoji}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            {isYT ? (
                              <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-0.5" />
                            ) : (
                              <ExternalLink className="w-5 h-5 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                          <span className="text-[10px] sm:text-xs text-white font-medium">
                            স্যাম্পল {li + 1}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
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
