

## Plan: সব স্যাম্পল ভিডিও Popup-এ দেখানো + থাম্বনেইল যোগ করা

### সমস্যা
- `ln.run` লিংকগুলো Cloudflare protection-এর কারণে resolve করা যাচ্ছে না — এগুলো iframe-এও কাজ করবে না, নতুন ট্যাবেও ব্লক হতে পারে
- `tinyurl.com` লিংকগুলো resolve করে আসল YouTube URL পাওয়া গেছে

### সমাধান — `src/components/SamplesSection.tsx`

**1. tinyurl লিংকগুলো সরাসরি YouTube URL দিয়ে রিপ্লেস করব** (resolve করা হয়ে গেছে):
- নিউজ ভয়েস: 5টি YouTube URL পাওয়া গেছে
- গল্প বলা ও অডিওবুক: 1টি
- অ্যানিমেশন ভয়েস: 3টি (1টি Shorts)
- কর্পোরেট ভয়েস: 2টি

**2. ln.run লিংকগুলো (অ্যাডভার্টাইজমেন্ট + ইউটিউব ভয়েস ক্যাটাগরি)** — এগুলো Cloudflare block করে, তাই এগুলো নতুন ট্যাবে ওপেন হবে (popup সম্ভব না)। আপনি যদি আসল YouTube লিংক দিতে পারেন তাহলে সেগুলোও popup-এ দেখানো সম্ভব হবে।

**3. YouTube থাম্বনেইল যোগ** — প্রতিটি YouTube লিংকের জন্য `img.youtube.com/vi/{videoId}/mqdefault.jpg` ব্যবহার করে সুন্দর থাম্বনেইল কার্ড দেখাব, মাঝখানে Play বাটন থাকবে।

**4. ln.run লিংকগুলোর জন্য** — একটি গ্র্যাডিয়েন্ট প্লেসহোল্ডার থাম্বনেইল দেখাব ExternalLink আইকন সহ।

### ফাইল
- `src/components/SamplesSection.tsx` — লিংক আপডেট, থাম্বনেইল UI, popup লজিক

