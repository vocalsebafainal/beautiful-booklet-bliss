import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "রাফি আহমেদ",
    role: "ইউটিউবার",
    text: "Vocalseba এর কাজ দেখে অবাক হয়ে গেছি! সময়মতো ডেলিভারি, প্রফেশনাল কোয়ালিটি। আমার চ্যানেলের ভয়েসওভারের জন্য এখন শুধু এদের উপরই ভরসা করি।",
    rating: 5,
  },
  {
    name: "ফারহানা ইসলাম",
    role: "বিজ্ঞাপন সংস্থা",
    text: "আমাদের ক্লায়েন্টদের জন্য প্রতিটি প্রজেক্টে Vocalseba অসাধারণ কাজ করেছে। তাদের আর্টিস্টদের versatility সত্যিই প্রশংসনীয়।",
    rating: 5,
  },
  {
    name: "তানভীর হাসান",
    role: "পডকাস্ট হোস্ট",
    text: "দ্রুত টার্নঅ্যারাউন্ড এবং চমৎকার কোয়ালিটি। আমার পডকাস্টের ইন্ট্রো এবং আউট্রো এখানে করিয়েছি, রেজাল্ট অসাম!",
    rating: 5,
  },
  {
    name: "নুসরাত জাহান",
    role: "ই-লার্নিং প্ল্যাটফর্ম",
    text: "আমাদের কোর্সের জন্য ন্যারেশন দরকার ছিল। Vocalseba সময়মতো এবং বাজেটের মধ্যে সবকিছু সম্পন্ন করেছে। ১০/১০ রিকমেন্ড করি!",
    rating: 5,
  },
  {
    name: "আরিফ রহমান",
    role: "অ্যাপ ডেভেলপার",
    text: "আমার অ্যাপের জন্য বাংলা ও ইংলিশ ভয়েস প্রম্পট দরকার ছিল। এতো তাড়াতাড়ি এতো ভালো কাজ আগে পাইনি। ধন্যবাদ Vocalseba!",
    rating: 5,
  },
  {
    name: "সাবরিনা চৌধুরী",
    role: "কন্টেন্ট ক্রিয়েটর",
    text: "YouTube ভিডিওর জন্য প্রফেশনাল ভয়েসওভার দরকার ছিল। Vocalseba-তে অর্ডার দিয়ে সত্যিই মুগ্ধ হয়েছি। দারুণ সার্ভিস!",
    rating: 5,
  },
  {
    name: "মাহমুদ হক",
    role: "গেম ডেভেলপার",
    text: "আমাদের গেমের ক্যারেক্টার ভয়েসিং এখান থেকে করিয়েছি। প্রতিটি ক্যারেক্টারের ভয়েস ইউনিক এবং পারফেক্ট হয়েছে।",
    rating: 5,
  },
  {
    name: "রিমা আক্তার",
    role: "ডকুমেন্টারি প্রডিউসার",
    text: "ডকুমেন্টারির ন্যারেশনের জন্য Vocalseba ব্যবহার করেছি। ন্যাচারাল টোন এবং ইমোশন পারফেক্টলি ক্যাপচার করেছে।",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section id="reviews" className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black gradient-text mb-3">ক্লায়েন্ট রিভিউ</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">আমাদের সন্তুষ্ট ক্লায়েন্টদের অভিজ্ঞতা</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2">
                  <div className="group relative h-full p-[1px] rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10 hover:from-primary/50 hover:to-primary/20 transition-all duration-500">
                    <div className="glass-card rounded-2xl p-6 h-full flex flex-col gap-4 relative overflow-hidden">
                      {/* Quote icon */}
                      <Quote className="w-10 h-10 text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors duration-300" />

                      {/* Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-foreground text-sm leading-relaxed flex-1">"{t.text}"</p>

                      {/* Author */}
                      <div className="border-t border-border/50 pt-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{t.name}</p>
                          <p className="text-muted-foreground text-xs">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-primary"
                      : "w-2 bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
