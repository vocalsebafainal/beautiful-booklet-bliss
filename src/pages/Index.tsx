import { useState } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
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
      <CategoryGrid onTierSelect={handleTierSelect} />

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Vocalseba Agency. সর্বস্বত্ব সংরক্ষিত।
        </p>
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
