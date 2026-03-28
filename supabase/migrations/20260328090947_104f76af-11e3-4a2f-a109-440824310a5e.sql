
DROP POLICY IF EXISTS "Admin full access artists" ON public.artists;

CREATE POLICY "Admin full access artists"
ON public.artists FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
