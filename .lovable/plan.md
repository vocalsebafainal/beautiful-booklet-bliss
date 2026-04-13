

## Plan: VoiceTypeSection সরলীকরণ — শুধু নাম ও স্যাম্পল লিংক রাখা

### সমস্যা
VoiceTypeSection-এ ১২টি ক্যাটাগরির ভেতরে Basic/Standard/Premium প্রাইসিং আছে, যেটা CategoryGrid-এ ইতোমধ্যে আছে — অর্থাৎ ডুপ্লিকেট। ইউজার চান এই সেকশনে শুধু ক্যাটাগরির নাম এবং স্যাম্পল লিংক (YouTube) থাকবে, প্রাইসিং তুলে দেওয়া হবে।

### কী করব

**VoiceTypeSection.tsx আপডেট:**

1. **tiers ডেটা সরিয়ে** প্রতিটি ক্যাটাগরিতে `sampleLinks: string[]` যোগ করব (YouTube/short links)
2. **ক্লিক করলে expand হলে** শুধু স্যাম্পল লিংকগুলো দেখাবে (স্যাম্পল ১, স্যাম্পল ২... হিসেবে)
3. **Basic/Standard/Premium কার্ড, প্রাইস, অর্ডার বাটন** সব সরিয়ে দেব
4. `onTierSelect` prop আর দরকার নেই — সরিয়ে দেব
5. ক্যাটাগরি গ্রিড সিম্পল ও ক্লিন রাখব — আইকন, নাম, বর্ণনা, এবং expand করলে স্যাম্পল লিংক

**Index.tsx আপডেট:**
- `VoiceTypeSection` থেকে `onTierSelect` prop সরিয়ে দেব

### Technical Details
- `TierInfo` interface এবং tiers ডেটা সম্পূর্ণ সরানো হবে
- প্রতিটি voiceType-এ `sampleLinks: string[]` array — প্লেসহোল্ডার হিসেবে খালি array দেব যেটা পরে আপডেট করা যাবে
- expand হলে লিংকগুলো `<a>` ট্যাগে দেখাবে, CategoryGrid-এর স্যাম্পল রেন্ডারিং প্যাটার্ন অনুসরণ করব
- ফাইল: `src/components/VoiceTypeSection.tsx`, `src/pages/Index.tsx`

