import { motion } from "framer-motion";
import { Play, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([^&?\s]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return null;
};

const DemoSection = () => {
  const [playing, setPlaying] = useState(false);

  const { data: config, isLoading } = useQuery({
    queryKey: ["marketing-config", "demo_video_url"],
    queryFn: async () => {
      const { data } = await supabase
        .from("marketing_configs")
        .select("*")
        .eq("config_name", "demo_video_url")
        .eq("is_active", true)
        .maybeSingle();
      return data;
    },
  });

  const rawUrl = config?.config_value || "";
  const embedUrl = getYouTubeEmbedUrl(rawUrl) || rawUrl;

  if (!embedUrl && !isLoading) return null;

  return (
    <section className="py-20 px-4" id="demo">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-3">
            আমাদের কাজ দেখুন
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            আমাদের প্রফেশনাল ভয়েস আর্টিস্টদের কাজের নমুনা শুনুন
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card overflow-hidden"
          >
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              {!playing ? (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-muted/60 backdrop-blur-sm transition-all duration-300 hover:bg-muted/40 group z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 gold-glow">
                    <Play size={36} className="text-primary-foreground ml-1" />
                  </div>
                </button>
              ) : null}
              {playing && (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${embedUrl}?autoplay=1`}
                  title="Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DemoSection;
