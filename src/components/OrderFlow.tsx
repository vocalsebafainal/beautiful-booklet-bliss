import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, MessageCircle, CheckCircle2, Copy, Check, X, Phone, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = "script" | "no-script" | "upload" | "payment" | "success";

interface OrderFlowProps {
  open: boolean;
  onClose: () => void;
  category: string;
  tier: string;
  price: number;
}

const PAYMENT_NUMBER = "01619070709";

const paymentMethods = [
  { id: "bkash" as const, name: "বিকাশ", color: "bg-pink-600", icon: "💳", bgLight: "bg-pink-600/10 border-pink-600/30", textColor: "text-pink-500" },
  { id: "nagad" as const, name: "নগদ", color: "bg-orange-600", icon: "💰", bgLight: "bg-orange-600/10 border-orange-600/30", textColor: "text-orange-500" },
  { id: "rocket" as const, name: "রকেট", color: "bg-purple-600", icon: "🚀", bgLight: "bg-purple-600/10 border-purple-600/30", textColor: "text-purple-500" },
];

const toBanglaNum = (num: number): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};

const OrderFlow = ({ open, onClose, category, tier, price }: OrderFlowProps) => {
  const [step, setStep] = useState<Step>("script");
  const [scriptText, setScriptText] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const orderId = `VS-${Date.now().toString(36).toUpperCase()}`;
  const advanceAmount = Math.ceil(price * 0.5);

  const handleClose = () => {
    setStep("script");
    setScriptText("");
    setTransactionId("");
    setCopied(false);
    onClose();
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(PAYMENT_NUMBER);
    setCopied(true);
    toast({ title: "কপি হয়েছে!", description: PAYMENT_NUMBER });
    setTimeout(() => setCopied(false), 2000);
  };

  const activeMethod = paymentMethods.find(m => m.id === paymentMethod)!;

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

        {/* Order summary */}
        <div className="glass-card p-4 space-y-1 text-center">
          <p className="text-xs text-muted-foreground">আপনার নির্বাচন</p>
          <p className="text-sm font-semibold text-foreground">{category} — {tier}</p>
          <p className="text-lg font-bold text-primary">৳{toBanglaNum(price)}</p>
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
          href="https://wa.me/8801619070709"
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
        <div className="flex gap-3">
          <button
            onClick={() => setStep("script")}
            className="flex-1 py-3 rounded-xl font-bold text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-all"
          >
            ← পিছনে
          </button>
          <button
            onClick={() => setStep("payment")}
            disabled={!scriptText.trim()}
            className="flex-1 gold-btn disabled:opacity-40 disabled:cursor-not-allowed"
          >
            পেমেন্ট করুন →
          </button>
        </div>
      </motion.div>
    ),

    payment: (
      <motion.div
        key="payment"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-5"
      >
        <div className="text-center">
          <Wallet className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-1">পেমেন্ট সম্পন্ন করুন</h3>
          <p className="text-muted-foreground text-sm">৫০% অগ্রিম পেমেন্ট প্রয়োজন</p>
        </div>

        {/* Price breakdown */}
        <div className="glass-card p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">মোট মূল্য</span>
            <span className="font-semibold text-foreground">৳{toBanglaNum(price)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">অগ্রিম (৫০%)</span>
            <span className="font-bold text-primary text-base">৳{toBanglaNum(advanceAmount)}</span>
          </div>
          <div className="border-t border-border/30 pt-2 flex justify-between text-sm">
            <span className="text-muted-foreground">বাকি (ডেলিভারির পর)</span>
            <span className="font-semibold text-foreground">৳{toBanglaNum(price - advanceAmount)}</span>
          </div>
        </div>

        {/* Payment method selector */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2.5">পেমেন্ট মেথড নির্বাচন করুন</p>
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`py-3 px-2 rounded-xl font-bold text-sm transition-all border-2 flex flex-col items-center gap-1.5 ${
                  paymentMethod === method.id
                    ? `${method.color} text-white border-transparent shadow-lg`
                    : `bg-muted/50 text-muted-foreground border-border/30 hover:border-primary/30`
                }`}
              >
                <span className="text-xl">{method.icon}</span>
                <span>{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Payment number card */}
        <div className={`rounded-xl p-4 text-center border ${activeMethod.bgLight}`}>
          <p className="text-xs text-muted-foreground mb-1">
            {activeMethod.name} — Send Money করুন
          </p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <p className={`text-2xl font-bold tracking-wider ${activeMethod.textColor}`}>
              {PAYMENT_NUMBER}
            </p>
            <button
              onClick={copyNumber}
              className={`p-1.5 rounded-lg transition-all ${
                copied ? "bg-green-500/20 text-green-500" : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">(পার্সোনাল নম্বর)</p>
          <div className="mt-2 py-1.5 px-3 rounded-lg bg-primary/10 inline-block">
            <p className="text-sm font-bold text-primary">পরিমাণ: ৳{toBanglaNum(advanceAmount)}</p>
          </div>
        </div>

        {/* Transaction ID */}
        <div className="space-y-2">
          <Label htmlFor="txn" className="text-sm font-medium">Transaction ID লিখুন</Label>
          <Input
            id="txn"
            placeholder="যেমন: TXN123456789"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="bg-muted/50 border-border/50 text-center text-lg tracking-wider"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep("upload")}
            className="flex-shrink-0 py-3 px-4 rounded-xl font-bold text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-all"
          >
            ←
          </button>
          <button
            onClick={() => {
              handleClose();
              navigate(`/thank-you?orderId=${orderId}&category=${encodeURIComponent(category)}&tier=${encodeURIComponent(tier)}&amount=${advanceAmount}`);
            }}
            disabled={!transactionId.trim()}
            className="flex-1 gold-btn disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            অর্ডার কনফার্ম করুন
          </button>
        </div>
      </motion.div>
    ),

    success: (
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10 }}
        >
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold mb-2">🎉 অভিনন্দন!</h3>
          <p className="text-muted-foreground">আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে</p>
        </div>

        <div className="glass-card p-4 space-y-2 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">অর্ডার আইডি</span>
            <span className="font-bold text-primary">{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ক্যাটাগরি</span>
            <span className="font-semibold text-foreground">{category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">প্যাকেজ</span>
            <span className="font-semibold text-foreground">{tier}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-border/30 pt-2">
            <span className="text-muted-foreground">পেমেন্ট</span>
            <span className="font-bold text-primary">৳{toBanglaNum(advanceAmount)} (অগ্রিম)</span>
          </div>
        </div>

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
        </div>

        <button onClick={handleClose} className="gold-btn w-full">
          হোম পেজে ফিরে যান
        </button>
      </motion.div>
    ),
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-border/50 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="sr-only">অর্ডার ফ্লো</DialogTitle>
          <DialogDescription className="sr-only">আপনার অর্ডার সম্পন্ন করুন</DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">{stepContent[step]}</AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFlow;
