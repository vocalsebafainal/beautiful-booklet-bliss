
-- Add new columns to artists table
ALTER TABLE public.artists ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.artists ADD COLUMN IF NOT EXISTS country text DEFAULT 'বাংলাদেশ';
ALTER TABLE public.artists ADD COLUMN IF NOT EXISTS image_url text;

-- Create storage bucket for artist images
INSERT INTO storage.buckets (id, name, public) VALUES ('artist-images', 'artist-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to artist images
CREATE POLICY "Public can view artist images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'artist-images');

-- Allow admins to manage artist images
CREATE POLICY "Admins can manage artist images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'artist-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'artist-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow public to insert orders
CREATE POLICY "Public can insert orders"
ON public.orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);
