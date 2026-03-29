import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Mic, Star, Crown, Check } from "lucide-react";

const tiers = [
  {
    icon: Mic,
    name: "Basic",
    label: "🎙 বেসিক",
    target: "পার্সোনাল প্রজেক্ট",
    delivery: "২৪-৪৮ ঘণ্টা ডেলিভারি",
    revisions: "১ বার রিভিশন",
    features: ["ক্লিন অডিও", "স্ট্যান্ডার্ড কোয়ালিটি", "MP3 ফরম্যাট"],
    highlight: false,
  },
  {
    icon: Star,
    name: "Standard",
    label: "⭐ স্ট্যান্ডার্ড",
    target: "প্রফেশনাল কন্টেন্ট",
    delivery: "২৪ ঘণ্টা ডেলিভারি",
    revisions: "৩ বার রিভিশন",
    features: ["ক্লিন অডিও", "হাই কোয়ালিটি", "MP3 + WAV ফরম্যাট", "ব্যাকগ্রাউন্ড মিউজিক"],
    highlight: true,
  },
  {
    icon: Crown,
    name: "Pro",
    label: "👑 প্রো",
    target: "হাই-এন্ড ব্র্যান্ড",
    delivery: "১২ ঘণ্টা সুপার-ফাস্ট",
    revisions: "আনলিমিটেড রিভিশন",
    features: ["প্রিমিয়াম অডিও", "সর্বোচ্চ কোয়ালিটি", "সব ফরম্যাট", "ব্যাকগ্রাউন্ড মিউজিক", "প্রায়োরিটি সাপোর্ট"],
    highlight: false,
  },
];

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
  category: string;
  onSelectTier: (tier: string) => void;
}

const PricingModal = ({ open, onClose, category, onSelectTier }: PricingModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl border-border/50 p-4 md:p-8 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center">
            <span className="text-primary">{category}</span> — প্যাকেজ নির্বাচন করুন
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            আপনার প্রয়োজন অনুযায়ী সেরা প্যাকেজ বেছে নিন
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 mt-6 md:mt-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-5 md:p-6 flex flex-col relative ${
                tier.highlight ? "border-primary/50 ring-1 ring-primary/30 mt-5" : ""
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 right-3 bg-gradient-to-r from-primary to-purple-500 text-primary-foreground text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/30 whitespace-nowrap z-10">
                  ⭐ জনপ্রিয়
                </div>
              )}
              <div className="text-2xl mb-3">{tier.label}</div>
              <p className="text-muted-foreground text-sm mb-1">{tier.target}</p>
              <p className="text-secondary text-sm font-medium mb-1">{tier.delivery}</p>
              <p className="text-foreground text-sm font-semibold mb-4">{tier.revisions}</p>

              <div className="flex-1 space-y-2 mb-6">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectTier(tier.name)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  tier.highlight
                    ? "gold-btn"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                অডার করুন
              </button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
