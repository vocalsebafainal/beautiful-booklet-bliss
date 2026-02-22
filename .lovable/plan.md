

# ফন্ট আপডেট: Hind Siliguri (বাংলা) + Poppins (ইংলিশ)

## কী হবে
সাইটের সব বাংলা টেক্সটের ফন্ট **Hind Siliguri** এবং ইংলিশ টেক্সটের ফন্ট **Poppins** হবে। ব্রাউজার স্বয়ংক্রিয়ভাবে বাংলা অক্ষরের জন্য Hind Siliguri এবং ইংলিশ অক্ষরের জন্য Poppins ব্যবহার করবে।

## টেকনিক্যাল ডিটেইলস

### ফাইল ১: `src/index.css`
- বর্তমান `Noto Sans Bengali` Google Font import সরিয়ে **Hind Siliguri** ও **Poppins** দুটো import করা হবে
- `body`-তে `font-family` আপডেট: `'Poppins', 'Hind Siliguri', sans-serif` — এতে ইংলিশ অক্ষর Poppins দিয়ে এবং বাংলা অক্ষর Hind Siliguri দিয়ে রেন্ডার হবে

### ফাইল ২: `tailwind.config.ts`
- `fontFamily.sans` আপডেট করে `['"Poppins"', '"Hind Siliguri"', 'sans-serif']` দেওয়া হবে

### কিভাবে কাজ করে
ব্রাউজার font-family লিস্টে প্রথমে Poppins খোঁজে। Poppins-এ বাংলা অক্ষর নেই, তাই বাংলা টেক্সটের জন্য স্বয়ংক্রিয়ভাবে পরের ফন্ট Hind Siliguri ব্যবহার করে। ফলে আলাদা করে কিছু করতে হয় না।

