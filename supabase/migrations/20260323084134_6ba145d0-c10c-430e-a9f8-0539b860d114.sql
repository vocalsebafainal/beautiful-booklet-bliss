
CREATE TABLE public.marketing_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_name text NOT NULL UNIQUE,
  config_value text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.marketing_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access marketing_configs"
  ON public.marketing_configs FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read active configs"
  ON public.marketing_configs FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

INSERT INTO public.marketing_configs (config_name, config_value, is_active)
VALUES ('fb_pixel_id', '', false);
