
-- Categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  per_word_price NUMERIC DEFAULT 0,
  express_price NUMERIC DEFAULT 0,
  revision_charge NUMERIC DEFAULT 0,
  delivery_time TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public read for active categories
CREATE POLICY "Public can view active categories"
ON public.categories FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Admin full access categories
CREATE POLICY "Admin full access categories"
ON public.categories FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Public read for active services
CREATE POLICY "Public can view active services"
ON public.services FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Admin full access services
CREATE POLICY "Admin full access services"
ON public.services FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Timestamps triggers
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for service audio
INSERT INTO storage.buckets (id, name, public) VALUES ('service-audio', 'service-audio', true);

CREATE POLICY "Public can view service audio"
ON storage.objects FOR SELECT
USING (bucket_id = 'service-audio');

CREATE POLICY "Admin can upload service audio"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'service-audio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update service audio"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'service-audio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete service audio"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'service-audio' AND public.has_role(auth.uid(), 'admin'));

-- Index for faster category filtering
CREATE INDEX idx_services_category_id ON public.services(category_id);
