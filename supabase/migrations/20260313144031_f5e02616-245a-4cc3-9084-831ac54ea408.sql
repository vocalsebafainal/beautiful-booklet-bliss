
-- Allow public/anonymous users to read active artists on the landing page
CREATE POLICY "Public can view active artists"
ON public.artists
FOR SELECT
TO anon, authenticated
USING (status = 'active');
