import { motion } from "framer-motion";
import { Shield, Clock, Headphones, Award } from "lucide-react";

const trustItems = [
  {
    icon: Clock,
    title: "দ্রুত ডেলিভারি",
    desc: "১২-৪৮ ঘণ্টার মধ্যে প্রফেশনাল ভয়েস ওভার",
  },
  {
    icon: Award,
    title: "সর্বোচ্চ কোয়ালিটি",
    desc: "ইন্ডাস্ট্রি-স্ট্যান্ডার্ড অডিও প্রোডাকশন",
  },
  {
    icon: Shield,
    title: "মানি-ব্যাক গ্যারান্টি",
    desc: "সন্তুষ্ট না হলে সম্পূর্ণ টাকা ফেরত",
  },
  {
    icon: Headphones,
    title: "২৪/৭ সাপোর্ট",
    desc: "যেকোনো সময় আমাদের সাথে যোগাযোগ করুন",
  },
];

const TrustSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 border-b border-border/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            কেন <span className="text-primary">Vocalseba</span> বেছে নেবেন?
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-5 md:p-6 text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-foreground font-bold text-sm md:text-base mb-1">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
