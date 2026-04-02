import { motion } from "framer-motion";
import { Gift, Clock } from "lucide-react";

const OfferBanner = () => {
  const handleClick = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 md:py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 p-8 md:p-12 text-center relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-primary/20 text-primary border border-primary/30 mb-5"
        >
          <Clock className="w-3.5 h-3.5" />
          সীমিত সময়ের অফার
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-4"
        >
          নতুন ক্লায়েন্টদের জন্য বিশেষ ছাড়!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-6"
        >
          প্রথম অর্ডারে <span className="text-primary font-bold">৩০% ছাড়</span> পাবেন। অফারটি যেকোনো সময় শেষ হতে পারে।
          <br />
          এখনই সুযোগটি কাজে লাগান।
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm md:text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
        >
          <Gift className="w-4 h-4" />
          অফার গ্রহণ করুন
        </motion.button>
      </motion.div>
    </section>
  );
};

export default OfferBanner;
