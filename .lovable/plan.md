

## Plan: স্যাম্পল লিংক সমস্যা ঠিক করা

### সমস্যা
স্যাম্পল বাটনে ক্লিক করলে ভিডিও দেখা যাচ্ছে না। কারণ — লিংকগুলো URL shortener (`ln.run`, `tinyurl.com`) যেগুলো iframe-এ লোড হয় না (X-Frame-Options block করে)। শুধুমাত্র সরাসরি YouTube embed URL iframe-এ কাজ করে।

### সমাধান — `src/components/SamplesSection.tsx`

1. **YouTube লিংক detect করে embed URL-এ রূপান্তর** — যদি লিংকে `youtube.com` বা `youtu.be` থাকে তাহলে `/embed/` ফরম্যাটে কনভার্ট করে iframe-এ দেখাব
2. **Shortener লিংক (ln.run, tinyurl)** — এগুলো iframe-এ কাজ করবে না, তাই এগুলোর জন্য **নতুন ট্যাবে ওপেন** করব (`window.open`)
3. **Popup শুধু YouTube embed URL এর জন্য** — বাকিগুলো সরাসরি নতুন ট্যাবে যাবে

### ফাইল
- `src/components/SamplesSection.tsx` — লিংক হ্যান্ডলিং লজিক আপডেট

