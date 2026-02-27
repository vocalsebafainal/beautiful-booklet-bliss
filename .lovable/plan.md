

# Demo সেকশন তৈরি

## নতুন ফাইল: `src/components/DemoSection.tsx`

একটি ডেমো ভিডিও সেকশন তৈরি হবে যেখানে:
- হেডার: "আমাদের কাজ দেখুন" (gradient text, animated)
- সাবটেক্সট: ছোট বর্ণনা
- ভিডিও এম্বেড এরিয়া: `16:9` aspect ratio, YouTube/অন্য ভিডিও লিংক embed করার জন্য `iframe`
- একটি placeholder VIDEO_URL ভ্যারিয়েবল থাকবে যেখানে সহজেই লিংক বসানো যাবে
- Glass card স্টাইল, framer-motion অ্যানিমেশন
- Play বাটন ওভারলে (থাম্বনেইল মোডে)

## পরিবর্তন: `src/pages/Index.tsx`

- `DemoSection` import করে `ArtistSection` এর আগে বসানো হবে

