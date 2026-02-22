import { motion } from "framer-motion";
import { Shield, Clock, Headphones, Award, ArrowRight, CheckCircle2 } from "lucide-react";

const trustItems = [
  { icon: Clock, title: "দ্রুত ডেলিভারি", desc: "১২-৪৮ ঘণ্টার মধ্যে" },
  { icon: Award, title: "টপ কোয়ালিটি", desc: "ইন্ডাস্ট্রি-স্ট্যান্ডার্ড" },
  { icon: Shield, title: "মানি-ব্যাক গ্যারান্টি", desc: "১০০% টাকা ফেরত" },
  { icon: Headphones, title: "২৪/৭ সাপোর্ট", desc: "সবসময় পাশে আছি" },
];

const proofs = [
  "500+ প্রজেক্ট সফলভাবে সম্পন্ন",
  "4.9/5 ক্লায়েন্ট রেটিং",
  "বাংলাদেশের শীর্ষ ব্র্যান্ডগুলোর বিশ্বস্ত পার্টনার",
];

const TrustSection = () => {
  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Subtle bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Trust icons row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-16">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5 text-center hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-foreground font-bold text-sm mb-0.5">{item.title}</h3>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 text-center relative overflow-hidden shimmer-border border-primary/20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">
            আজই আপনার <span className="gradient-text">ভয়েস ওভার</span> প্রজেক্ট শুরু করুন
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-6">
            সময় নষ্ট করবেন না — প্রতিদিন শত শত কন্টেন্ট ক্রিয়েটর আমাদের উপর ভরসা করছেন।
          </p>

          {/* Social proof checklist */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8">
            {proofs.map((p) => (
              <div key={p} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          <button
            onClick={scrollToCategories}
            className="gold-btn text-base md:text-lg px-10 py-5 group pulse-glow-btn inline-flex items-center gap-2"
          >
            এখনই ক্যাটাগরি বেছে নিন
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-muted-foreground text-xs mt-4">
            🔒 কোনো অগ্রিম পেমেন্ট নেই — আগে শুনুন, তারপর পে করুন
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
