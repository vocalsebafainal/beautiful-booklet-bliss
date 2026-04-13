

## Plan: রিভিউ সেকশন ডাইনামিক ও সুন্দর করা

### কী করব

**TestimonialsSection.tsx রিডিজাইন:**

1. **২ কলাম লেআউট** — প্রতিটি স্লাইডে ২টি রিভিউ কার্ড পাশাপাশি দেখাবে (মোবাইলে ১টি)
2. **অটো-স্লাইড** — `embla-carousel-autoplay` প্লাগিন ব্যবহার করে প্রতি ৪ সেকেন্ডে স্বয়ংক্রিয়ভাবে পরবর্তী স্লাইডে যাবে
3. **আরো রিভিউ যোগ** — বর্তমান ৫টি থেকে ৮টি করব যাতে ৪টি স্লাইড হয় (২x৪)
4. **কার্ড ডিজাইন উন্নত** — গ্র্যাডিয়েন্ট বর্ডার, অ্যাভাটার ইনিশিয়াল সার্কেল, বড় Quote আইকন, হোভার ইফেক্ট
5. **ডট ইন্ডিকেটর** — নিচে অ্যাক্টিভ স্লাইড দেখাতে ডট নেভিগেশন যোগ করব
6. **স্মুথ অ্যানিমেশন** — framer-motion দিয়ে কার্ডের entrance animation

### Technical Details
- `CarouselItem` এ `md:basis-1/2` রেখে দেব (২ কলাম), মোবাইলে `basis-full`
- Autoplay plugin: `embla-carousel-autoplay` (already available as dependency)
- Carousel API থেকে `selectedScrollSnap` ব্যবহার করে active dot track করব
- গ্লাসমরফিজম স্টাইল বজায় রাখব

### ফাইল
- `src/components/TestimonialsSection.tsx` — সম্পূর্ণ আপডেট

