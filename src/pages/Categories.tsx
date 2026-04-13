import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import { Loader2, Mic } from "lucide-react";

export default function Categories() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              সকল ক্যাটাগরি
            </span>
            <h1 className="text-3xl md:text-5xl font-black gradient-text mb-3">
              ভয়েস ওভার ক্যাটাগরি
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি বেছে নিন
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">কোনো ক্যাটাগরি পাওয়া যায়নি।</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat: any, i: number) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/category/${cat.slug}`}
                    className="group block p-6 rounded-2xl border border-primary/20 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all text-center"
                  >
                    {cat.image_url ? (
                      <img
                        src={cat.image_url}
                        alt={cat.name}
                        className="w-16 h-16 mx-auto mb-4 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Mic className="w-7 h-7 text-primary" />
                      </div>
                    )}
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
