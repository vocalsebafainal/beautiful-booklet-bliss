import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const artists = [
  { name: "Shadman Sakib", specialty: "Ad", initials: "SS" },
  { name: "Rajvi", specialty: "Ad, Documentary", initials: "RJ" },
  { name: "Farzana Haq", specialty: "Caller Tune", initials: "FH" },
  { name: "Ummay Habiba Shibly", specialty: "Promotion", initials: "UH" },
  { name: "Fatima Islam", specialty: "Narration", initials: "FI" },
  { name: "Zain Shiplu", specialty: "Movie Explainer", initials: "ZS" },
  { name: "Ekram Hossain", specialty: "Carton", initials: "EH" },
  { name: "Anny", specialty: "News, Ad", initials: "AN" },
  { name: "Sadik Hasan Emon", specialty: "News", initials: "SE" },
  { name: "Srabon Sani", specialty: "Promotion", initials: "SS" },
  { name: "Hasib", specialty: "News", initials: "HA" },
  { name: "Mim", specialty: "News, Story Telling, Caller Tune", initials: "MI" },
  { name: "Sakhawat", specialty: "Ad", initials: "SK" },
];

const ArtistSection = () => {
  const [showAll, setShowAll] = useState(false);
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
            {visible.map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index < 6 ? index * 0.08 : (index - 6) * 0.06 }}
                layout
                className="glass-card-hover p-5 md:p-6 flex flex-col items-center text-center gap-3"
              >
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/30">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg md:text-xl">
                    {artist.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-sm md:text-base">{artist.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-primary text-xs font-medium">
                    <Mic size={12} />
                    <span>{artist.specialty}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
      </div>
    </section>
  );
};

export default ArtistSection;
