

## Plan: হিরো সেকশনের Social Proof ব্যাজকে রেফারেন্স ইমেজের মতো গ্লাস কার্ড ডিজাইনে রূপান্তর

### কী করব

**HeroSection.tsx — Social Proof অংশ রিডিজাইন:**

বর্তমানে ৩টি আলাদা ছোট ব্যাজ আছে। এগুলোকে একটি **একক glass-card** এ রূপান্তর করব রেফারেন্স ইমেজ অনুসারে:

1. **কার্ডের উপরে** — বড় বেগুনি গ্লো সার্কেলে মাইক্রোফোন আইকন (Mic from lucide)
2. **মাঝখানে** — ছোট soundwave bars অ্যানিমেশন (বেগুনি কালারে পালসিং)
3. **নিচে** — ৩টি স্ট্যাট পাশাপাশি:
   - `৫০০+` প্রজেক্ট
   - `২৪ঘণ্টা` ডেলিভারি
   - `৪.৯★` রেটিং

**অ্যানিমেশন:**
- মাইক্রোফোন সার্কেলে pulse glow animation (বেগুনি গ্লো)
- Soundwave bars — existing `soundwave-bar` CSS animation ব্যবহার করব
- কার্ড entry animation — framer-motion দিয়ে

### ফাইল
- `src/components/HeroSection.tsx` — Social Proof badges অংশ রিপ্লেস

