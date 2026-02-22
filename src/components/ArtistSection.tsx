import { motion } from "framer-motion";
import { MapPin, Mic } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const artists = [
  { name: "রাকিব হাসান", location: "ঢাকা", specialty: "প্লেব্যাক সিঙ্গার", initials: "রহ" },
  { name: "তানিয়া আক্তার", location: "চট্টগ্রাম", specialty: "ভয়েসওভার আর্টিস্ট", initials: "তা" },
  { name: "সাকিব রহমান", location: "রাজশাহী", specialty: "রেকর্ডিং আর্টিস্ট", initials: "সর" },
  { name: "নুসরাত জাহান", location: "সিলেট", specialty: "পডকাস্ট হোস্ট", initials: "নজ" },
  { name: "ফাহিম আহমেদ", location: "খুলনা", specialty: "মিক্সিং ইঞ্জিনিয়ার", initials: "ফআ" },
  { name: "মিথিলা সরকার", location: "ঢাকা", specialty: "সঙ্গীত পরিচালক", initials: "মস" },
];

const ArtistSection = () => {
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
          {artists.map((artist, index) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card-hover p-5 md:p-6 flex flex-col items-center text-center gap-3"
            >
              <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/30">
                <AvatarImage src="" alt={artist.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg md:text-xl">
                  {artist.initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <h3 className="font-bold text-foreground text-sm md:text-base">{artist.name}</h3>
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs">
                  <MapPin size={12} />
                  <span>{artist.location}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-primary text-xs font-medium">
                  <Mic size={12} />
                  <span>{artist.specialty}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
