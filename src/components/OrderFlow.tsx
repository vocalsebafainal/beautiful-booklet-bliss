import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, MessageCircle, CheckCircle2, Copy, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = "script" | "no-script" | "upload" | "payment" | "success";

interface OrderFlowProps {
  open: boolean;
  onClose: () => void;
  category: string;
  tier: string;
}

const OrderFlow = ({ open, onClose, category, tier }: OrderFlowProps) => {
  const [step, setStep] = useState<Step>("script");
  const [scriptText, setScriptText] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad">("bkash");
  const { toast } = useToast();

  const orderId = `VS-${Date.now().toString(36).toUpperCase()}`;

  const handleClose = () => {
    setStep("script");
    setScriptText("");
    setTransactionId("");
    onClose();
  };

  const copyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    toast({ title: "কপি হয়েছে!", description: num });
  };

  const stepContent: Record<Step, React.ReactNode> = {
    script: (
      <motion.div
        key="script"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="text-center">
          <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">আপনার কি স্ক্রিপ্ট তৈরি আছে?</h3>
          <p className="text-muted-foreground text-sm">ভয়েস ওভারের জন্য স্ক্রিপ্ট প্রয়োজন</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setStep("upload")}
            className="glass-card-hover p-6 text-center flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-500" />
            </div>
            <span className="font-bold">হ্যাঁ</span>
          </button>
          <button
            onClick={() => setStep("no-script")}
            className="glass-card-hover p-6 text-center flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <X className="w-6 h-6 text-red-500" />
            </div>
            <span className="font-bold">না</span>
          </button>
        </div>
      </motion.div>
    ),

    "no-script": (
      <motion.div
        key="no-script"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">স্ক্রিপ্ট তৈরি করতে সাহায্য চান?</h3>
          <p className="text-muted-foreground text-sm">
            স্ক্রিপ্ট তৈরি করতে আমাদের ম্যানেজারের সাথে যোগাযোগ করুন
          </p>
        </div>
        <a
          href="https://wa.me/8801XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp এ যোগাযোগ করুন
        </a>
        <button
          onClick={() => setStep("script")}
          className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← পিছনে যান
        </button>
      </motion.div>
    ),

    upload: (
      <motion.div
        key="upload"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="text-center">
          <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">আপনার স্ক্রিপ্ট পেস্ট করুন</h3>
        </div>
        <div className="space-y-2">
          <Label htmlFor="script">স্ক্রিপ্ট টেক্সট</Label>
          <Textarea
            id="script"
            placeholder="এখানে আপনার স্ক্রিপ্ট পেস্ট করুন..."
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            className="min-h-[160px] bg-muted/50 border-border/50"
          />
        </div>
        <button
          onClick={() => setStep("payment")}
          disabled={!scriptText.trim()}
          className="gold-btn w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          পরবর্তী ধাপ →
        </button>
      </motion.div>
    ),

    payment: (
      <motion.div
        key="payment"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">৫০% অগ্রিম পেমেন্ট সম্পন্ন করুন</h3>
          <p className="text-muted-foreground text-sm">নিচের নম্বরে পেমেন্ট পাঠান</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setPaymentMethod("bkash")}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              paymentMethod === "bkash"
                ? "bg-pink-600 text-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            বিকাশ
          </button>
          <button
            onClick={() => setPaymentMethod("nagad")}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              paymentMethod === "nagad"
                ? "bg-orange-600 text-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            নগদ
          </button>
        </div>

        <div className="glass-card p-4 text-center">
          <p className="text-muted-foreground text-sm mb-1">
            {paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} নম্বর
          </p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xl font-bold text-foreground">
              {paymentMethod === "bkash" ? "01XXXXXXXXX" : "01XXXXXXXXX"}
            </p>
            <button
              onClick={() => copyNumber(paymentMethod === "bkash" ? "01XXXXXXXXX" : "01XXXXXXXXX")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-muted-foreground text-xs mt-1">(পার্সোনাল নম্বর)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="txn">Transaction ID</Label>
          <Input
            id="txn"
            placeholder="আপনার ট্রানজেকশন আইডি লিখুন"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="bg-muted/50 border-border/50"
          />
        </div>

        <button
          onClick={() => setStep("success")}
          disabled={!transactionId.trim()}
          className="gold-btn w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Pay & Confirm Order
        </button>
      </motion.div>
    ),

    success: (
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-4"
      >
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        <div>
          <h3 className="text-xl font-bold mb-2">🎉 অভিনন্দন!</h3>
          <p className="text-muted-foreground">আপনার অডার সফলভাবে সম্পন্ন হয়েছে</p>
        </div>

        <div className="glass-card p-4 space-y-2">
          <p className="text-sm text-muted-foreground">অডার আইডি</p>
          <p className="text-lg font-bold text-primary">{orderId}</p>
          <p className="text-sm text-muted-foreground">ক্যাটাগরি: {category}</p>
          <p className="text-sm text-muted-foreground">প্যাকেজ: {tier}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          আমাদের কাস্টমার ম্যানেজার শীঘ্রই আপনার সাথে যোগাযোগ করবে। ধন্যবাদ! 🙏
        </p>

        <button onClick={handleClose} className="gold-btn">
          হোম পেজে ফিরে যান
        </button>
      </motion.div>
    ),
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-border/50 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="sr-only">অডার ফ্লো</DialogTitle>
          <DialogDescription className="sr-only">আপনার অডার সম্পন্ন করুন</DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">{stepContent[step]}</AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFlow;
