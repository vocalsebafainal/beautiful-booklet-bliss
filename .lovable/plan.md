

# আর্টিস্ট স্যাম্পল ভিডিও সিস্টেম

প্রতিটি আর্টিস্ট কার্ডে একটি "স্যাম্পল দেখুন" বাটন যোগ হবে। ক্লিক করলে একটি Dialog/Modal popup এ ভিডিও প্লে হবে।

---

## ডাটাবেস পরিবর্তন

`artists` টেবিলে একটি নতুন কলাম যোগ করা হবে:
- `sample_video_url` (text, nullable) — YouTube embed URL বা অন্য ভিডিও লিংক

এতে Admin panel থেকে প্রতিটি আর্টিস্টের জন্য ভিডিও URL সেট করা যাবে — সম্পূর্ণ dynamic।

## ফ্রন্টেন্ড পরিবর্তন

### `src/components/ArtistSection.tsx`
- হার্ডকোডেড artists array সরিয়ে Supabase থেকে active artists fetch করা হবে (React Query দিয়ে)
- প্রতিটি কার্ডে "🎬 স্যাম্পল দেখুন" বাটন যোগ হবে (শুধু যাদের `sample_video_url` আছে)
- ক্লিক করলে Dialog popup open হবে — ভিতরে আর্টিস্টের নাম + iframe ভিডিও প্লেয়ার
- X বাটন দিয়ে বন্ধ করা যাবে

### `src/pages/AdminArtists.tsx`
- Artist create/edit ফর্মে "Sample Video URL" ইনপুট ফিল্ড যোগ হবে
- Admin এখান থেকে যেকোনো আর্টিস্টের ভিডিও URL যোগ/আপডেট করতে পারবে

## ফাইল পরিবর্তন সারসংক্ষেপ

1. **Migration** — `artists` টেবিলে `sample_video_url` কলাম যোগ
2. **Edit** `src/components/ArtistSection.tsx` — DB থেকে fetch + ভিডিও popup modal
3. **Edit** `src/pages/AdminArtists.tsx` — ফর্মে video URL ফিল্ড যোগ

