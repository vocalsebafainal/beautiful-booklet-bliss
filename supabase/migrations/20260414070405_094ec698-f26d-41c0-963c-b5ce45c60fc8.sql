
CREATE TABLE public.samples (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_name TEXT NOT NULL,
  category_emoji TEXT NOT NULL DEFAULT '🎤',
  video_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.samples ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active samples" ON public.samples
  FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Admin full access samples" ON public.samples
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_samples_updated_at
  BEFORE UPDATE ON public.samples
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
