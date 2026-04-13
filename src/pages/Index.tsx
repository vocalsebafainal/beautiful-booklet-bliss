import { useState } from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import BallPoolSection from "@/components/BallPoolSection";
import StatsCounter from "@/components/StatsCounter";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import VoiceTypeSection from "@/components/VoiceTypeSection";
import CategoryGrid from "@/components/CategoryGrid";
import DemoSection from "@/components/DemoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ArtistSection from "@/components/ArtistSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import OfferBanner from "@/components/OfferBanner";
import OrderFlow from "@/components/OrderFlow";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);

  const handleTierSelect = (category: string, tier: string, price: number) => {
    setSelectedCategory(category);
    setSelectedTier(tier);
    setSelectedPrice(price);
    setOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <HeroSection />
      <BallPoolSection />
      <StatsCounter />
      <TrustSection />
      <CategoryGrid onTierSelect={handleTierSelect} />
      <VoiceTypeSection onTierSelect={handleTierSelect} />
      <DemoSection />
      <TestimonialsSection />
      <ArtistSection />
      <HowItWorks />
      <OfferBanner />
      <FAQSection />
      <Footer />
      <FloatingButtons />

      <OrderFlow
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        category={selectedCategory}
        tier={selectedTier}
        price={selectedPrice}
      />
    </div>
  );
};

export default Index;
