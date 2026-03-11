

# Ball Pool সেকশন — ইন্টারেক্টিভ সার্ভিস এক্সপ্লোরার

HeroSection এর পরে একটি আকর্ষণীয় "Ball Pool" সেকশন তৈরি হবে যেখানে সার্ভিস ক্যাটাগরিগুলো ফ্লোটিং বাবল/বল আকারে দেখাবে। ক্লিক করলে ডিটেইল expand হবে।

---

## কী তৈরি হবে

একটি নতুন `BallPoolSection.tsx` কম্পোনেন্ট:

- **7টি ফ্লোটিং বল/বাবল** — প্রতিটি একটি সার্ভিস ক্যাটাগরি (Ad, YouTube, News, Storytelling, Islamic, Cartoon, Corporate)
- প্রতিটি বলে **emoji + নাম** থাকবে
- বলগুলো `framer-motion` দিয়ে **float animation** করবে (ওঠানামা, হালকা rotate)
- **hover এ glow effect** ও scale up
- **ক্লিক করলে** নিচে সেই ক্যাটাগরির সংক্ষিপ্ত বিবরণ + "অর্ডার করুন" বাটন expand হবে (AnimatePresence দিয়ে)
- মোবাইলে 3 কলাম, ডেস্কটপে circular/scattered layout
- CategoryGrid এর ডাটা reuse করা হবে

## পেজে অবস্থান

```text
StickyHeader
HeroSection
→ BallPoolSection (নতুন)
StatsCounter
TrustSection
...
```

## ফাইল পরিবর্তন

1. **নতুন**: `src/components/BallPoolSection.tsx` — ফ্লোটিং বাবল UI + ক্লিকে ডিটেইল শো
2. **এডিট**: `src/pages/Index.tsx` — BallPoolSection import ও HeroSection এর পরে যোগ

