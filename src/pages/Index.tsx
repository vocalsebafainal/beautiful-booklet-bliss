import { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import CategoryGrid from "@/components/CategoryGrid";
import ArtistSection from "@/components/ArtistSection";
import DemoSection from "@/components/DemoSection";
import OrderFlow from "@/components/OrderFlow";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");

  const handleTierSelect = (category: string, tier: string) => {
    setSelectedCategory(category);
    setSelectedTier(tier);
    setOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <HeroSection />
      <TrustSection />
      <CategoryGrid onTierSelect={handleTierSelect} />
      <DemoSection />
      <ArtistSection />

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-3">
          <p className="font-bold text-lg text-primary-foreground"><span className="text-primary">Vocal</span><span className="text-secondary">seba</span> Agency</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <a
              href="https://wa.me/8801XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[hsl(142,70%,49%)] hover:bg-[hsl(142,70%,42%)] text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm">

              <MessageCircle size={20} />
              WhatsApp এ মেসেজ করুন
            </a>
            <a
              href="mailto:contact@vocalseba.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 text-sm">

              <Mail size={20} />
              ইমেইল করুন
            </a>
          </div>
          <p className="text-muted-foreground text-xs pt-2">
            © {new Date().getFullYear()} Vocalseba Agency. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>

      <OrderFlow
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        category={selectedCategory}
        tier={selectedTier} />

    </div>);

};

export default Index;