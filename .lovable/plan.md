

## Plan: VoiceTypeSection রিমুভ ও CategoryGrid-এ স্যাম্পল উন্নত করা

### সমস্যা বিশ্লেষণ
- CategoryGrid-এ ইতোমধ্যেই প্রতিটি ক্যাটাগরিতে Basic/Standard/Premium টিয়ার + স্যাম্পল লিংক আছে (স্ক্রিনশট অনুযায়ী)
- VoiceTypeSection ডুপ্লিকেট — একই ক্যাটাগরি আবার দেখায়, তাই রিমুভ করতে হবে
- CategoryGrid-এ বেশিরভাগ স্যাম্পল শুধু Basic-এ আছে, Standard ও Premium-এ খালি — সুন্দরভাবে ডিস্ট্রিবিউট করা দরকার

### কী করব

**1. VoiceTypeSection রিমুভ:**
- `src/components/VoiceTypeSection.tsx` ফাইল থেকে কম্পোনেন্ট রিমুভ (বা ফাইল ডিলিট)
- `src/pages/Index.tsx` থেকে VoiceTypeSection import ও রেন্ডারিং সরিয়ে দেব

**2. CategoryGrid-এ স্যাম্পল লিংক ডিস্ট্রিবিউশন উন্নত:**
- যেসব ক্যাটাগরিতে শুধু Basic-এ স্যাম্পল আছে, সেগুলো Standard ও Premium-এও ছড়িয়ে দেব (যদি পর্যাপ্ত লিংক থাকে)
- স্যাম্পল ডিসপ্লে স্টাইল ঠিক রাখব — বর্তমান "🔗 স্যাম্পল:" + লিংক লিস্ট ফরম্যাটই থাকবে

### Technical Details
- ফাইল: `src/components/VoiceTypeSection.tsx` (রিমুভ), `src/pages/Index.tsx` (ক্লিনআপ), `src/components/CategoryGrid.tsx` (স্যাম্পল আপডেট)

