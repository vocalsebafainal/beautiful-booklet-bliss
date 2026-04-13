import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import { Loader2, ArrowLeft, ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import OrderFlow from "@/components/OrderFlow";

export default function CategoryServices() {
  const { slug } = useParams<{ slug: string }>();
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const { data: category, isLoading: catLoading } = useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: services = [], isLoading: svcLoading } = useQuery({
    queryKey: ["services", category?.id],
    enabled: !!category?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("category_id", category!.id)
        .eq("is_active", true)
        .order("created_at");
      if (error) throw error;
      return data;
    },
  });

  const handleOrder = (service: any) => {
    setSelectedService(service);
    setOrderOpen(true);
  };

  const toBanglaNum = (n: number) =>
    n.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  const isLoading = catLoading || svcLoading;

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> সব ক্যাটাগরি
          </Link>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !category ? (
            <p className="text-center text-muted-foreground py-20">ক্যাটাগরি পাওয়া যায়নি।</p>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
                  {category.name}
                </h1>
                <p className="text-muted-foreground">
                  এই ক্যাটাগরিতে {toBanglaNum(services.length)}টি সার্ভিস পাওয়া গেছে
                </p>
              </motion.div>

              {services.length === 0 ? (
                <p className="text-center text-muted-foreground py-16 border border-dashed border-border rounded-xl">
                  এই ক্যাটাগরিতে এখনো কোনো সার্ভিস যোগ করা হয়নি।
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((svc: any, i: number) => (
                    <motion.div
                      key={svc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl border border-border/50 bg-card p-6 flex flex-col gap-4 hover:border-primary/30 hover:shadow-lg transition-all"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{svc.title}</h3>
                        {svc.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {svc.description}
                          </p>
                        )}
                      </div>

                      {svc.audio_url && <AudioPlayer src={svc.audio_url} title="ডেমো শুনুন" />}

                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-2xl font-black text-primary">
                          ৳{toBanglaNum(svc.price)}
                        </span>
                        {svc.delivery_time && (
                          <span className="flex items-center gap-1 text-muted-foreground ml-auto">
                            <Clock className="h-3.5 w-3.5" /> {svc.delivery_time}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <Link to={`/service/${svc.id}`} className="flex-1">
                          <Button variant="outline" className="w-full text-sm">
                            বিস্তারিত দেখুন
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleOrder(svc)}
                          className="flex-1 gap-2 text-sm"
                        >
                          <ShoppingCart className="h-4 w-4" /> অর্ডার করুন
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />

      {selectedService && (
        <OrderFlow
          open={orderOpen}
          onClose={() => setOrderOpen(false)}
          category={category?.name || ""}
          tier={selectedService.title}
          price={selectedService.price}
        />
      )}
    </div>
  );
}
