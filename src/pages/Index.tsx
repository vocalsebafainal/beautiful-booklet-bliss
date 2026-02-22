import { useState } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import CategoryGrid from "@/components/CategoryGrid";
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

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-3">
          <p className="text-foreground font-bold text-lg">Vocalseba Agency</p>
          <p className="text-muted-foreground text-sm">
            প্রফেশনাল ভয়েস ওভার সার্ভিস — বাংলাদেশ থেকে বিশ্বে
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/8801XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              📱 WhatsApp
            </a>
            <span className="text-border">|</span>
            <a
              href="mailto:contact@vocalseba.com"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              ✉️ Email
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
        tier={selectedTier}
      />
    </div>
  );
};

export default Index;
