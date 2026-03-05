

# আর্টিস্ট তথ্য আপডেট

PDF থেকে ১৩ জন ভয়েস আর্টিস্টের তথ্য পাওয়া গেছে। দুটি জায়গায় আপডেট করতে হবে:

---

## ১. ডাটাবেস আপডেট (artists টেবিল)

নিচের ১৩ জন আর্টিস্ট ডাটাবেসে INSERT করা হবে:

| নাম | ফোন | বিশেষত্ব | রেট |
|-----|------|----------|-----|
| Shadman Sakib | 01684-559779 | Ad | 2000 |
| Farzana Haq | 01771-941444 | Caller Tune | 1000 |
| Ekram Hossain | 01813-226236 | Carton | 200 |
| Anny | 01833-626976 | News, Ad | 1000 |
| Sadik Hasan Emon | 01707-457968 | News | 400 |
| Srabon Sani | 01794-692719 | Promotion | 700 |
| Ummay Habiba Shibly | 01881-138975 | Promotion | 800 |
| Rajvi | 01916-913814 | Ad, Documentary | 7000 |
| Zain Shiplu | 01770-871770 | Movie Explainer | 700 |
| Hasib | 01707-457968 | News | 200 |
| Fatima Islam | 01714-379334 | Narration | 1000 |
| Mim | 01812-710490 | News, Story Telling, Caller Tune | 500 |
| Sakhawat | 01911-462211 | Ad | 2000 |

- Supabase insert tool ব্যবহার করে ডাটা যোগ হবে
- Admin panel এর Artists page এ এরা সরাসরি দেখা যাবে

## ২. ফ্রন্টেন্ড আর্টিস্ট সেকশন আপডেট

`src/components/ArtistSection.tsx` এর হার্ডকোডেড বাংলা নামগুলো আসল আর্টিস্টদের নাম ও বিশেষত্ব দিয়ে রিপ্লেস হবে (৬টি ফিচার্ড আর্টিস্ট দেখানো হবে ল্যান্ডিং পেজে)।

