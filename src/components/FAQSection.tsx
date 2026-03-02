import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "ভয়েসওভার অর্ডার করতে কী কী লাগবে?",
    a: "শুধুমাত্র আপনার স্ক্রিপ্ট বা কন্টেন্ট দিলেই হবে। যদি স্ক্রিপ্ট না থাকে, আমরা সাহায্য করবো।",
  },
  {
    q: "ডেলিভারি কতক্ষণে পাবো?",
    a: "সাধারণত ১২-২৪ ঘণ্টার মধ্যে ডেলিভারি দেওয়া হয়। জরুরি প্রজেক্টের জন্য ফাস্ট ট্র্যাক অপশন আছে।",
  },
  {
    q: "পেমেন্ট কিভাবে করবো?",
    a: "বিকাশ, নগদ, এবং রকেটে পেমেন্ট করা যায়। পেমেন্ট কনফার্ম হলেই কাজ শুরু হবে।",
  },
  {
    q: "রিভিশন কি পাবো?",
    a: "হ্যাঁ! প্রতিটি প্যাকেজে নির্দিষ্ট সংখ্যক রিভিশন অন্তর্ভুক্ত আছে। Pro প্যাকেজে আনলিমিটেড রিভিশন।",
  },
  {
    q: "কোন কোন ভাষায় ভয়েসওভার পাওয়া যায়?",
    a: "বাংলা (স্ট্যান্ডার্ড ও আঞ্চলিক), ইংলিশ, হিন্দি এবং আরবি ভাষায় ভয়েসওভার সেবা পাওয়া যায়।",
  },
  {
    q: "কমার্শিয়াল ইউজের লাইসেন্স কি দেওয়া হয়?",
    a: "হ্যাঁ, সকল ডেলিভারির সাথে কমার্শিয়াল ইউজ রাইটস অন্তর্ভুক্ত থাকে।",
  },
  {
    q: "বাল্ক অর্ডারে কি ডিসকাউন্ট আছে?",
    a: "অবশ্যই! ৫টির বেশি প্রজেক্টে স্পেশাল ডিসকাউন্ট পাবেন। বিস্তারিত জানতে WhatsApp এ যোগাযোগ করুন।",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black gradient-text mb-3">সচরাচর জিজ্ঞাসা</h2>
          <p className="text-muted-foreground">আপনার প্রশ্নের উত্তর এখানে পাবেন</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card px-6 border-border/30 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="text-foreground text-sm md:text-base font-semibold hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
