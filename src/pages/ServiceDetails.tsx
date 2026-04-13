import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import { Loader2, ArrowLeft, ShoppingCart, Clock, DollarSign, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import OrderFlow from "@/components/OrderFlow";

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const [orderOpen, setOrderOpen] = useState(false);

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*, categories(*)")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const toBanglaNum = (n: number) =>
    n.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <StickyHeader />
        <div className="pt-28 text-center py-20">
          <p className="text-muted-foreground">সার্ভিস পাওয়া যায়নি।</p>
          <Link to="/categories" className="text-primary mt-4 inline-block">
            ক্যাটাগরিতে ফিরুন
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const cat = service.categories as any;

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {cat && (
            <Link
              to={`/category/${cat.slug}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> {cat.name}
            </Link>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              {service.title}
            </h1>

            {service.description && (
              <p className="text-muted-foreground mb-8 leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            )}

            {service.audio_url && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3">🎧 ডেমো শুনুন</h3>
                <AudioPlayer src={service.audio_url} title={service.title} />
              </div>
            )}

            {/* Price breakdown */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 mb-8">
              <h3 className="font-bold text-foreground mb-4">💰 মূল্য বিবরণী</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">বেস প্রাইস</p>
                    <p className="font-bold text-foreground">৳{toBanglaNum(service.price)}</p>
                  </div>
                </div>
                {service.per_word_price > 0 && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">প্রতি শব্দ</p>
                      <p className="font-bold text-foreground">৳{toBanglaNum(service.per_word_price)}</p>
                    </div>
                  </div>
                )}
                {service.express_price > 0 && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">এক্সপ্রেস ডেলিভারি</p>
                      <p className="font-bold text-foreground">৳{toBanglaNum(service.express_price)}</p>
                    </div>
                  </div>
                )}
                {service.revision_charge > 0 && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <RotateCcw className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">রিভিশন চার্জ</p>
                      <p className="font-bold text-foreground">৳{toBanglaNum(service.revision_charge)}</p>
                    </div>
                  </div>
                )}
                {service.delivery_time && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">ডেলিভারি টাইম</p>
                      <p className="font-bold text-foreground">{service.delivery_time}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setOrderOpen(true)}
              className="w-full sm:w-auto gap-2 text-base px-8"
            >
              <ShoppingCart className="h-5 w-5" /> এখনই অর্ডার করুন — ৳{toBanglaNum(service.price)}
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />

      <OrderFlow
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        category={cat?.name || ""}
        tier={service.title}
        price={service.price}
      />
    </div>
  );
}
