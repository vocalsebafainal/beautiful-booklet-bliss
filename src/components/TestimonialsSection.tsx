import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
];

const TestimonialsSection = () => {
  return (
    <section id="reviews" className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="container mx-auto max-w-5xl relative z-10">
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
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="glass-card p-6 h-full flex flex-col gap-4 relative">
                    <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed flex-1">"{t.text}"</p>
                    <div className="border-t border-border/50 pt-4">
                      <p className="font-bold text-foreground text-sm">{t.name}</p>
                      <p className="text-muted-foreground text-xs">{t.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
