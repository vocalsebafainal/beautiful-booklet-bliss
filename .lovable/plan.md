
# লোগো অনুযায়ী ব্র্যান্ড কালার থিম আপডেট

## লোগোর রং বিশ্লেষণ

লোগোতে দুটি প্রধান রং আছে:
- **Purple/Magenta** (#9B2D8B) - "VOCAL" অংশ, মাইক্রোফোন আইকন
- **Dark Navy Blue** (#1B1464) - "SEBA" অংশ, ট্রেবল ক্লেফ

## কী পরিবর্তন হবে

বর্তমান Gold + Turquoise থিম সরিয়ে Purple + Navy Blue থিম দেওয়া হবে। ডার্ক ব্যাকগ্রাউন্ড রাখা হবে কিন্তু সব accent কালার লোগো অনুযায়ী হবে। প্রিমিয়াম ফিল বজায় থাকবে।

## টেকনিক্যাল ডিটেইলস

### ফাইল ১: `src/index.css` - CSS Variables আপডেট

**কালার ম্যাপিং:**
- `--primary`: Gold (45 100% 50%) থেকে **Purple** (295 55% 39%) - মূল ব্র্যান্ড কালার
- `--secondary`: Turquoise (174 56% 40%) থেকে **Navy Blue** (250 72% 24%) - সেকেন্ডারি কালার
- `--ring`: Gold থেকে Purple
- `--sidebar-primary` ও `--sidebar-ring`: Gold থেকে Purple
- `--accent`: Turquoise থেকে Navy Blue

**Gradient ও Glow আপডেট:**
- `.gradient-text`: Gold-Turquoise গ্র্যাডিয়েন্ট থেকে Purple-Navy গ্র্যাডিয়েন্ট
- `.gold-glow` কে `.brand-glow` স্টাইলে Purple glow দেওয়া হবে
- `@keyframes btn-glow`: Gold glow থেকে Purple glow
- `.shimmer-border`: Gold shimmer থেকে Purple shimmer

### ফাইল ২: `src/components/HeroSection.tsx`

- `bg-primary/5` glow ইফেক্ট ঠিক থাকবে (CSS variable আপডেটের কারণে অটো চেঞ্জ হবে)
- `text-secondary` ক্লাস অটো Navy Blue হবে
- Soundwave bars এর `bg-primary/60` অটো Purple হবে

### ফাইল ৩: `src/components/StickyHeader.tsx`

- হেডারের "seba" টেক্সটে `text-primary` অটো Purple হবে
- "Vocal" অংশকে `text-primary` দিয়ে Purple করা হবে, "seba" অংশকে Navy Blue কালার দেওয়া হবে লোগোর মতো

### ফাইল ৪: `src/components/TrustSection.tsx`

- সব `text-primary` আইকন ও ব্যাজ অটো Purple হবে
- কোনো ম্যানুয়াল পরিবর্তন দরকার নেই

### ফাইল ৫: `src/components/CategoryGrid.tsx`

- `border-primary/30`, `bg-primary/10` সব অটো Purple টোনে হবে
- `text-secondary` ডেলিভারি টেক্সট Navy Blue হবে

### ফাইল ৬: `src/components/OrderFlow.tsx`

- সব `text-primary` আইকন Purple হবে
- `bg-primary` বাটন Purple হবে

### ফাইল ৭: `src/pages/Index.tsx`

- Footer এ "Vocalseba" নামটা লোগোর মতো দুই রঙে দেখানো হবে

## সামগ্রিক প্রভাব

- পুরো সাইট Gold-Turquoise থেকে Purple-Navy Blue থিমে পরিবর্তিত হবে
- ডার্ক ব্যাকগ্রাউন্ড ও গ্লাসমরফিজম ইফেক্ট আগের মতোই থাকবে
- লোগোর সাথে পুরো ব্র্যান্ডিং মিলে যাবে
- প্রিমিয়াম, লাক্সারি ফিল বজায় থাকবে
