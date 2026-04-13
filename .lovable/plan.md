

## Plan: VoiceTypeSection-এ প্রাইসিং টিয়ার যোগ করা

### সমস্যা
বর্তমানে VoiceTypeSection-এর ১২টি আইকন ক্যাটাগরি (কমার্শিয়াল, ন্যারেশন, অ্যানিমেশন ইত্যাদি) ক্লিক করলে শুধু নিচে স্ক্রল হয়। ইউজার চান প্রতিটি ক্যাটাগরিতে ক্লিক করলে সেখানেই Basic/Standard/Premium প্রাইসিং দেখাবে — ঠিক CategoryGrid-এর মতো expandable pricing cards।

### কী করব

**VoiceTypeSection.tsx সম্পূর্ণ রিডিজাইন:**

1. প্রতিটি voiceType আইটেমে `tiers` অ্যারে যোগ করব (CategoryGrid-এর মতো structure):
   - Basic: প্রাইস, শব্দ/সময় সীমা, সার্ভিস লিস্ট
   - Standard: প্রাইস, সীমা, সার্ভিস (highlighted)
   - Premium: প্রাইস, সীমা, সার্ভিস

2. প্রতিটি ক্যাটাগরির জন্য আলাদা আলাদা প্রাইস থাকবে (যেমন কমার্শিয়ালের Basic ১,৫০০ কিন্তু অডিও বুকের Basic ২,০০০)

3. ক্লিক করলে সেই ক্যাটাগরি expand হবে এবং ৩টি টিয়ার কার্ড দেখাবে — CategoryGrid-এর একই UI pattern ব্যবহার করব (AnimatePresence, spring animation, shimmer-border)

4. টিয়ার কার্ডে "অর্ডার করুন" বাটন থাকবে — ক্লিক করলে OrderFlow ওপেন হবে

5. নিচের `categoryCards` সেকশন সরিয়ে দেব কারণ এখন ওপরের আইকনগুলোতেই pricing আছে

**Index.tsx আপডেট:**
- VoiceTypeSection-এ `onTierSelect` prop পাঠাব (CategoryGrid-এর মতো) যাতে OrderFlow trigger হয়

### Technical Details

- VoiceTypeSection-এ `useState` দিয়ে `expandedCategory` ট্র্যাক করব
- AnimatePresence দিয়ে expand/collapse অ্যানিমেশন
- ১২টি ক্যাটাগরির প্রতিটিতে আলাদা tiers ডেটা
- Grid layout: collapsed অবস্থায় 7-column/5-column, expanded হলে full-width span
- Index.tsx-এ VoiceTypeSection-এ `onTierSelect={handleTierSelect}` prop যোগ

