import { useState } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import CategoryGrid from "@/components/CategoryGrid";
import DemoSection from "@/components/DemoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ArtistSection from "@/components/ArtistSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
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
      <StatsCounter />
      <TrustSection />
      <HowItWorks />
      <CategoryGrid onTierSelect={handleTierSelect} />
      <DemoSection />
      <TestimonialsSection />
      <ArtistSection />
      <FAQSection />
      <Footer />
      <FloatingButtons />

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
