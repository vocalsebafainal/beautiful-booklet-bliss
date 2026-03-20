import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, ChevronDown, ChevronUp, Play, MapPin, Image as ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([^&?\s]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return null; // Not a YouTube URL
};

const isYouTubeUrl = (url: string) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const ArtistSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);

  const { data: artists = [] } = useQuery({
    queryKey: ["public-artists"],
    queryFn: async () => {
      const { data } = await supabase
        .from("artists")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: true });
      return data || [];
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const visible = showAll ? artists : artists.slice(0, 6);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">আমাদের আর্টিস্ট</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            অভিজ্ঞ ও প্রতিভাবান আর্টিস্টদের সাথে কাজ করুন
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((artist: any, index: number) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index < 6 ? index * 0.08 : (index - 6) * 0.06 }}
                layout
                className="glass-card-hover p-5 md:p-6 flex flex-col items-center text-center gap-3"
              >
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/30">
                  {artist.image_url ? (
                    <AvatarImage src={artist.image_url} alt={artist.name} className="object-cover" />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg md:text-xl">
                    {getInitials(artist.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-base md:text-lg">{artist.name}</h3>
                  {(artist.category || artist.specialization) && (
                    <div className="flex items-center justify-center gap-1 text-primary text-xs font-medium">
                      <Mic size={12} />
                      <span>{artist.category || artist.specialization}</span>
                    </div>
                  )}
                  {artist.country && (
                    <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs">
                      <MapPin size={10} />
                      <span>{artist.country}</span>
                    </div>
                  )}
                </div>

                {artist.sample_video_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs mt-1 border-primary/30 text-primary hover:bg-primary/10"
                    onClick={() => setSelectedArtist(artist)}
                  >
                    <Play size={12} />
                    স্যাম্পল দেখুন
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {artists.length > 6 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="gap-2"
            >
              {showAll ? "কম দেখুন" : `আরো দেখুন (${artists.length - 6})`}
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!selectedArtist} onOpenChange={(open) => !open && setSelectedArtist(null)}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-lg">
              🎬 {selectedArtist?.name} — স্যাম্পল
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedArtist?.sample_video_url && (
              getYouTubeEmbedUrl(selectedArtist.sample_video_url) ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedArtist.sample_video_url) || ""}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${selectedArtist.name} sample`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-muted/30">
                  <Play className="w-12 h-12 text-primary" />
                  <a
                    href={selectedArtist.sample_video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                  >
                    ▶ ভিডিও দেখুন
                  </a>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ArtistSection;
