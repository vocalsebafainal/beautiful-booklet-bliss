import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Phone, Home } from "lucide-react";

const toBanglaNum = (num: number): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId") || "N/A";
  const category = searchParams.get("category") || "";
  const tier = searchParams.get("tier") || "";
  const amount = Number(searchParams.get("amount") || 0);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, delay: 0.2 }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
        </motion.div>

        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">🎉 অভিনন্দন!</h1>
          <p className="text-muted-foreground">আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে</p>
        </div>

        {(orderId !== "N/A" || category) && (
          <div className="glass-card p-5 space-y-3 text-left">
            {orderId !== "N/A" && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">অর্ডার আইডি</span>
                <span className="font-bold text-primary">{orderId}</span>
              </div>
            )}
            {category && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ক্যাটাগরি</span>
                <span className="font-semibold text-foreground">{category}</span>
              </div>
            )}
            {tier && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">প্যাকেজ</span>
                <span className="font-semibold text-foreground">{tier}</span>
              </div>
            )}
            {amount > 0 && (
              <div className="flex justify-between text-sm border-t border-border/30 pt-3">
                <span className="text-muted-foreground">পেমেন্ট (অগ্রিম)</span>
                <span className="font-bold text-primary">৳{toBanglaNum(amount)}</span>
              </div>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          আমাদের কাস্টমার ম্যানেজার শীঘ্রই আপনার সাথে যোগাযোগ করবে। ধন্যবাদ! 🙏
        </p>

        <div className="flex flex-col gap-3 w-full">
          <a
            href="https://wa.me/8801710922638"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp এ যোগাযোগ করুন
          </a>
          <a
            href="tel:01619070709"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            <Phone className="w-5 h-5" />
            সরাসরি কল করুন
          </a>
          <button
            onClick={() => navigate("/")}
            className="gold-btn w-full flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            হোম পেজে ফিরে যান
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
