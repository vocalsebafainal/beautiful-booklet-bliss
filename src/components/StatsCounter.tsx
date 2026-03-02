import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Mic, Star, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "সন্তুষ্ট ক্লায়েন্ট" },
  { icon: Mic, value: 50, suffix: "+", label: "প্রফেশনাল আর্টিস্ট" },
  { icon: Star, value: 4.9, suffix: "", label: "গড় রেটিং", decimal: true },
  { icon: Clock, value: 12, suffix: "hr", label: "ফাস্ট ডেলিভারি" },
];

const CountUp = ({ target, decimal, suffix }: { target: number; decimal?: boolean; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-3xl md:text-5xl font-black gradient-text">
      {decimal ? count.toFixed(1) : Math.floor(count)}{suffix}
    </span>
  );
};

const StatsCounter = () => {
  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center space-y-2"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-3">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <CountUp target={stat.value} decimal={stat.decimal} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
