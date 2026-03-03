

# Admin Panel — Professional Vocalseba Dashboard

## Prerequisites
Supabase এখনো connect করা হয়নি। প্রথমে **Lovable Cloud** activate করতে হবে যাতে database, authentication, এবং RLS সবকিছু কাজ করে।

---

## Database Schema (Supabase Migrations)

### Tables:
1. **`orders`** — অর্ডার ট্র্যাকিং
   - `id`, `order_id` (VS-XXX), `client_name`, `client_phone`, `client_email`, `category`, `tier`, `script_text`, `payment_method`, `transaction_id`, `amount`, `status` (pending/in_progress/recording/delivered/cancelled), `assigned_artist_id`, `notes`, `created_at`, `updated_at`

2. **`clients`** — ক্লায়েন্ট ডাটা
   - `id`, `name`, `phone`, `email`, `total_orders`, `total_spent`, `notes`, `created_at`

3. **`artists`** — কণ্ঠশিল্পী প্রোফাইল
   - `id`, `name`, `phone`, `specialization`, `rate_per_project`, `status` (active/inactive), `total_projects`, `rating`, `created_at`

4. **`user_roles`** — admin role management (security definer function সহ)

### RLS Policies:
- সব table এ RLS enabled
- `has_role(auth.uid(), 'admin')` দিয়ে admin-only access
- Security architecture tool ব্যবহার করা হবে

---

## New Pages & Components

### 1. `/admin/login` — Admin Login Page
- Email/password login (Supabase Auth)
- Protected route — শুধু admin role holder access পাবে

### 2. `/admin` — Dashboard (Analytics)
- Total Orders, Revenue, Active Clients, Active Artists — animated stat cards
- Orders by status (pie/bar chart — recharts)
- Recent orders table
- Monthly revenue trend line chart

### 3. `/admin/orders` — Order Management
- Sortable/filterable table: Order ID, Client, Category, Tier, Status, Artist, Date
- Status update dropdown (Pending → In Progress → Recording → Delivered)
- Artist assign করা
- Order details modal
- Search by order ID / client name

### 4. `/admin/clients` — Client Management
- Client list table with search
- Add/Edit client dialog
- Order history per client
- Total spent, order count

### 5. `/admin/artists` — Artist Management
- Artist list with status badges
- Add/Edit artist dialog
- Specialization tags
- Active/Inactive toggle
- Projects count, rating

### Layout:
- **Sidebar** navigation (shadcn sidebar component ব্যবহার)
- Collapsible sidebar with icons
- Header with admin name, logout button
- Responsive — mobile এ hamburger menu

---

## File Structure

```text
src/
├── pages/
│   ├── AdminLogin.tsx
│   ├── AdminDashboard.tsx
│   ├── AdminOrders.tsx
│   ├── AdminClients.tsx
│   └── AdminArtists.tsx
├── components/admin/
│   ├── AdminLayout.tsx        (sidebar + header wrapper)
│   ├── AdminSidebar.tsx       (navigation sidebar)
│   ├── StatCard.tsx           (animated dashboard card)
│   ├── OrdersTable.tsx        (orders data table)
│   ├── OrderStatusBadge.tsx   (color-coded status)
│   ├── ClientsTable.tsx
│   ├── ArtistsTable.tsx
│   ├── AddEditDialog.tsx      (reusable form dialog)
│   └── DashboardCharts.tsx    (recharts charts)
├── hooks/
│   ├── useOrders.ts
│   ├── useClients.ts
│   ├── useArtists.ts
│   └── useAdminAuth.ts
└── integrations/supabase/     (auto-generated after Cloud setup)
```

---

## Implementation Steps (3-4 messages এ ভাগ করে)

**Phase 1**: Lovable Cloud activate → Database schema create → Auth setup → Admin login page  
**Phase 2**: Admin layout (sidebar) → Dashboard with analytics charts  
**Phase 3**: Orders management page (table, status update, artist assign)  
**Phase 4**: Clients & Artists management pages

---

## Technology
- **Supabase** — Auth, Database, RLS
- **shadcn sidebar** — Admin navigation
- **recharts** (already installed) — Dashboard charts
- **@tanstack/react-query** — Data fetching & caching
- **framer-motion** — Animations
- **shadcn table, dialog, select, badge** — UI components

## First Step
শুরু করতে আমাকে **Lovable Cloud enable** করতে হবে। Approve করলে আমি Cloud setup শুরু করবো।

