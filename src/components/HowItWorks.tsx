import { motion } from "framer-motion";
import { ListChecks, Package, FileText, Headphones } from "lucide-react";

const steps = [
  { icon: ListChecks, number: "১", title: "ক্যাটাগরি নির্বাচন", desc: "আপনার প্রজেক্টের ধরন বেছে দিন" },
  { icon: Package, number: "২", title: "প্যাকেজ বাছাই", desc: "বাজেট ও চাহিদা অনুযায়ী প্যাকেজ বেছে দিন" },
  { icon: FileText, number: "৩", title: "স্ক্রিপ্ট প্রদান", desc: "আপনার স্ক্রিপ্ট পাঠিয়ে দিন, না থাকলে আমরা তৈরি করব" },
  { icon: Headphones, number: "৪", title: "ভয়েস ডেলিভারি", desc: "নির্ধারিত সময়ে সম্পন্ন ফাইল পাবেন" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/20 mb-4">
            প্রক্রিয়া
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">কীভাবে কাজ করে?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            মাত্র ৪টি সহজ ধাপে আপনার ভয়েস ওভার প্রস্তুত।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card p-6 md:p-8 text-center group hover:border-primary/40 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-lg font-bold mb-5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                {step.number}
              </div>
              <h3 className="text-foreground font-bold text-base md:text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
