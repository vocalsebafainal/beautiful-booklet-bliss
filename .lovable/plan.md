

## Plan: সম্পূর্ণ সাইট Mobile ও Desktop Responsive করা

### কী করব

সাইটের প্রতিটি প্রধান সেকশন রিভিউ করে responsive issues ঠিক করব:

**1. HeroSection.tsx**
- মোবাইলে hero title (`text-3xl`) আরো ছোট ডিভাইসে ভালো ফিট করাতে `text-2xl` থেকে শুরু করব
- Social Proof Card এর `px-8` মোবাইলে `px-4` করব, stats gap কমাব
- Bokeh particles মোবাইলে লুকাব বা কমাব

**2. StickyHeader.tsx**
- ইতিমধ্যে ভালো responsive আছে (lg breakpoint এ menu toggle)। ছোট ফোনে (320px) logo ও button overlap চেক করে gap/padding adjust করব

**3. SamplesSection.tsx**
- ক্যাটাগরি কার্ডের ভেতরে sample buttons গ্রিড মোবাইলে `grid-cols-2` থেকে `grid-cols-3` — ছোট ফোনে `grid-cols-2` ঠিক আছে কিন্তু button padding কমাব (`p-3` instead of `p-4`)
- Video popup modal — মোবাইলে `max-w-3xl` ঠিক আছে কিন্তু `p-4` padding যোগ আছে ইতিমধ্যে। Close button সাইজ ঠিক রাখব

**4. VoiceTypeSection.tsx**
- Pricing cards/tiers মোবাইলে stack হচ্ছে কিনা চেক করব, text overflow ঠিক করব

**5. StatsCounter.tsx**
- মোবাইলে `grid-cols-2` ইতিমধ্যে আছে — counter text size ছোট ফোনে `text-2xl` করব

**6. TrustSection.tsx**
- Awards row মোবাইলে `flex-wrap` আছে — ছোট ফোনে award cards full width করব
- CTA block padding মোবাইলে `p-5` করব

**7. Footer.tsx**
- ইতিমধ্যে responsive grid আছে (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)

**8. FloatingButtons.tsx**
- মোবাইলে `bottom-4 right-4` করব, WhatsApp button সামান্য ছোট করব

**9. DemoSection.tsx**
- ইতিমধ্যে ভালো responsive

### ফাইল পরিবর্তন
- `src/components/HeroSection.tsx` — mobile padding, text size, social proof card adjust
- `src/components/SamplesSection.tsx` — mobile button size, popup responsive
- `src/components/StatsCounter.tsx` — smaller phone text size
- `src/components/TrustSection.tsx` — mobile padding, awards layout
- `src/components/FloatingButtons.tsx` — mobile position adjust
- `src/components/VoiceTypeSection.tsx` — mobile text/card overflow fix

