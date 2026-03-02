import { motion } from "framer-motion";
import { ListChecks, FileText, Mic2, PackageCheck } from "lucide-react";

const steps = [
  { icon: ListChecks, title: "ক্যাটাগরি বাছাই", desc: "আপনার প্রয়োজন অনুযায়ী ভয়েস ক্যাটাগরি সিলেক্ট করুন" },
  { icon: FileText, title: "স্ক্রিপ্ট দিন", desc: "আপনার স্ক্রিপ্ট বা কন্টেন্ট আমাদের পাঠান" },
  { icon: Mic2, title: "রেকর্ডিং", desc: "আমাদের প্রফেশনাল আর্টিস্টরা রেকর্ড করবেন" },
  { icon: PackageCheck, title: "ডেলিভারি", desc: "২৪ ঘণ্টার মধ্যে ফাইনাল ফাইল পাবেন" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black gradient-text mb-3">কিভাবে কাজ করে?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">মাত্র ৪টি সহজ ধাপে আপনার প্রফেশনাল ভয়েসওভার রেডি</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector line - desktop only */}
          <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center group"
            >
              <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-primary/30 group-hover:border-primary transition-colors duration-300 mb-5 shadow-lg">
                <step.icon className="w-9 h-9 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-foreground font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
