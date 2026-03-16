
লক্ষ্য: public site-এ একটি স্পষ্ট Login button থাকবে, কিন্তু আপনার উত্তর অনুযায়ী এটা হবে শুধুই Admin login। সাধারণ user account, profile table, বা public signup এখন যোগ করা হবে না।

1. বর্তমান অবস্থা যাচাই
- `/admin/login` পেজ already আছে
- `user_roles` + `has_role()` দিয়ে admin access already secure করা আছে
- admin panel থেকে orders, clients, artists already manage করা যায়
- public landing page-এ এখন কোনো login CTA নেই

2. কী build করা হবে
- Header-এ একটি স্পষ্ট “Admin Login” button যোগ করা হবে
- Mobile menu-তেও একই login option থাকবে
- চাইলে Hero section-এ secondary CTA হিসেবে admin login shortcutও যোগ করা হবে
- button click করলে `/admin/login` এ যাবে
- login success হলে `/admin` dashboard-এ redirect হবে

3. Admin management কীভাবে হবে
কারণ আপনি “Only admin login” বলেছেন, তাই public login page-এ “admin/user add” form রাখা হবে না। এটা নিরাপদ না।

তার বদলে:
- admin panel-এর ভিতরে নতুন “Admin Users” / “Access Management” section যোগ করা হবে
- existing admin সেখান থেকে নতুন admin add করতে পারবে
- admin list দেখতে পারবে
- প্রয়োজনে admin role remove করতে পারবে
- সবকিছু server-side role check দিয়ে secure থাকবে

4. Backend approach
- আলাদা profile table বানানো হবে না, কারণ আপনি বলেছেন profile data দরকার নেই
- existing `user_roles` table reuse করা হবে
- নতুন admin account তৈরি করার জন্য একটি secure backend function লাগবে
- function:
  - authenticated admin কিনা verify করবে
  - নতুন auth user তৈরি করবে
  - `user_roles` এ `admin` role insert করবে
- public client থেকে সরাসরি role assign করা হবে না

5. UI flow
```text
Landing Page
  -> Admin Login button
  -> /admin/login
  -> successful admin check
  -> /admin dashboard
       -> Orders
       -> Clients
       -> Artists
       -> Admin Users
```

6. কোন ফাইলগুলোতে কাজ লাগবে
- `src/components/StickyHeader.tsx`
- `src/pages/AdminLogin.tsx` (copy/UX refinement if needed)
- `src/App.tsx` (new admin users route)
- `src/components/admin/AdminSidebar.tsx`
- নতুন admin users page/component
- secure backend function for creating/managing admin accounts

7. Security decisions
- public page থেকে admin create করা হবে না
- localStorage/hardcoded admin check ব্যবহার করা হবে না
- server-side role validation থাকবে
- no anonymous signup
- no user profile table unless later needed

8. Final result
- homepage থেকে সহজে admin login করা যাবে
- admin panel থেকেই সব management করা যাবে
- future-এ চাইলে regular user login আলাদা feature হিসেবে cleanভাবে add করা যাবে, কিন্তু এখন system admin-only থাকবে

9. Assumption for implementation
- যেহেতু “নতুন admin/user কোথা থেকে add হবে” প্রশ্নের উত্তর পাওয়া যায়নি, আমি secure default ধরছি:
  - public site: only login button
  - admin add/manage: admin panel-এর ভিতরে
