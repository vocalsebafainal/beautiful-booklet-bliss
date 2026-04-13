

## Plan: VoiceTypeSection-এ প্রাইসিং টিয়ার ফিরিয়ে আনা

### সমস্যা
আগে VoiceTypeSection-এ প্রতিটি ক্যাটাগরি expand করলে Basic/Standard/Premium প্যাকেজ দেখাতো। এখন সেগুলো সরিয়ে দেওয়ায় শুধু "স্যাম্পল শীঘ্রই আসছে..." দেখাচ্ছে।

### কী করব

**VoiceTypeSection.tsx আপডেট:**

1. **TierInfo interface ফিরিয়ে আনব** — name, label, price, priceNum, limit, services, highlight
2. **প্রতিটি voiceType-এ tiers ডেটা যোগ করব** — ১২টি ক্যাটাগরির জন্য আলাদা আলাদা Basic/Standard/Premium প্যাকেজ (প্রাইস, শব্দ সীমা, সার্ভিস তালিকা)
3. **sampleLinks রাখব** — তবে প্রাইসিং কার্ডের পাশাপাশি দেখাবে
4. **Expand হলে CategoryGrid-এর মতো ৩-কলাম টিয়ার কার্ড রেন্ডার করব** — প্রাইস, লিমিট, সার্ভিস, অর্ডার বাটন সহ
5. **onTierSelect prop ফিরিয়ে আনব** — অর্ডার বাটনে ক্লিক করলে OrderFlow ওপেন হবে

**Index.tsx আপডেট:**
- `VoiceTypeSection`-এ `onTierSelect={handleTierSelect}` prop পাঠাব

### Technical Details
- CategoryGrid-এর টিয়ার কার্ড রেন্ডারিং প্যাটার্ন হুবহু অনুসরণ করব (glass-card, shimmer-border, জনপ্রিয় ব্যাজ, অর্ডার বাটন)
- ফাইল: `src/components/VoiceTypeSection.tsx`, `src/pages/Index.tsx`

