

## Plan: ডেমো ভিডিও সেকশনে YouTube Thumbnail যোগ করা

### সমস্যা
বর্তমানে ভিডিও প্লে করার আগে শুধু একটি ধূসর ব্যাকগ্রাউন্ডে Play বাটন দেখায় — কোনো thumbnail নেই, তাই দেখতে আকর্ষণীয় লাগছে না।

### সমাধান
YouTube ভিডিও URL থেকে স্বয়ংক্রিয়ভাবে video ID বের করে YouTube-এর `maxresdefault` thumbnail ইমেজ ব্যবহার করব। এতে:
- ভিডিও প্লে করার আগে সুন্দর thumbnail দেখাবে
- Play বাটন thumbnail-এর ওপরে overlay হিসেবে থাকবে
- ক্লিক করলে আগের মতোই ভিডিও চালু হবে

### কী পরিবর্তন হবে

**DemoSection.tsx:**
1. `getYouTubeEmbedUrl` ফাংশন থেকে video ID extract করে `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg` URL তৈরি করব
2. Play বাটনের পেছনে `<img>` ট্যাগে এই thumbnail দেখাব
3. ব্যাকগ্রাউন্ড `bg-muted/60` এর বদলে thumbnail ইমেজ থাকবে, তার ওপরে সামান্য dark overlay + Play বাটন

### Technical Detail
- YouTube thumbnail URL pattern: `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg` (fallback: `hqdefault.jpg`)
- কোনো API key লাগবে না — এটা public URL
- শুধু একটি ফাইল পরিবর্তন: `src/components/DemoSection.tsx`

