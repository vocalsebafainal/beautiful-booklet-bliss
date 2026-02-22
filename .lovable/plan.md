

# হিরো সেকশনে স্টুডিও ইমেজ যোগ

## কী পরিবর্তন হবে

হিরো সেকশনের ব্যাকগ্রাউন্ডে রেকর্ডিং স্টুডিওর ছবিটি 5% অপাসিটিতে যোগ হবে। এটি একটি সূক্ষ্ম ব্যাকগ্রাউন্ড টেক্সচার হিসেবে কাজ করবে।

## টেকনিক্যাল ডিটেইলস

### ধাপ ১: ইমেজ কপি
- `user-uploads://ai-generated-interior-of-a-recording-studio-with-lots-of-equipment-ai-generative-photo.jpg` ফাইলটি `src/assets/studio-bg.jpg` এ কপি করা হবে

### ধাপ ২: `src/components/HeroSection.tsx` পরিবর্তন
- ইমেজটি ES6 মডিউল হিসেবে ইমপোর্ট: `import studioBg from "@/assets/studio-bg.jpg"`
- ব্যাকগ্রাউন্ড ইফেক্টস সেকশনে (লাইন 32-34) একটি নতুন `img` বা `div` যোগ:
  - `absolute inset-0` দিয়ে পুরো সেকশন কভার করবে
  - `opacity-[0.05]` দিয়ে 5% অপাসিটি
  - `object-cover` দিয়ে সুন্দরভাবে ফিট হবে
  - বিদ্যমান গ্র্যাডিয়েন্ট ও সাউন্ডওয়েভ ইফেক্টের নিচে থাকবে

