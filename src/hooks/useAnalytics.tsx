import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

interface AnalyticsContextType {
  trackPageView: () => void;
  trackLead: (data?: Record<string, any>) => void;
  trackPurchase: (value: number, currency?: string, data?: Record<string, any>) => void;
  trackInitiateCheckout: (data?: Record<string, any>) => void;
  trackViewContent: (data?: Record<string, any>) => void;
  trackButtonClick: (buttonName: string) => void;
  pixelReady: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackPageView: () => {},
  trackLead: () => {},
  trackPurchase: () => {},
  trackInitiateCheckout: () => {},
  trackViewContent: () => {},
  trackButtonClick: () => {},
  pixelReady: false,
});

export const useAnalytics = () => useContext(AnalyticsContext);

function injectPixelScript(pixelId: string) {
  if (document.getElementById("fb-pixel-script")) return;

  // fbq base code
  const f = window;
  const b = document;
  if (f.fbq) return;
  const n: any = (f.fbq = function (...args: any[]) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
  });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];

  const s = b.createElement("script");
  s.id = "fb-pixel-script";
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = b.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(s, firstScript);

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [pixelReady, setPixelReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchPixelId = async () => {
      try {
        const { data, error } = await supabase
          .from("marketing_configs")
          .select("config_value, is_active")
          .eq("config_name", "fb_pixel_id")
          .single();

        if (!error && data && data.is_active && data.config_value) {
          injectPixelScript(data.config_value);
          setPixelReady(true);
        }
      } catch {
        // silently fail - pixel is optional
      }
    };
    fetchPixelId();
  }, []);

  // Auto track PageView on route change
  useEffect(() => {
    if (pixelReady && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname, pixelReady]);

  const trackPageView = useCallback(() => {
    if (pixelReady && window.fbq) window.fbq("track", "PageView");
  }, [pixelReady]);

  const trackLead = useCallback((data?: Record<string, any>) => {
    if (pixelReady && window.fbq) window.fbq("track", "Lead", data);
  }, [pixelReady]);

  const trackPurchase = useCallback((value: number, currency = "BDT", data?: Record<string, any>) => {
    if (pixelReady && window.fbq) window.fbq("track", "Purchase", { value, currency, ...data });
  }, [pixelReady]);

  const trackInitiateCheckout = useCallback((data?: Record<string, any>) => {
    if (pixelReady && window.fbq) window.fbq("track", "InitiateCheckout", data);
  }, [pixelReady]);

  const trackViewContent = useCallback((data?: Record<string, any>) => {
    if (pixelReady && window.fbq) window.fbq("track", "ViewContent", data);
  }, [pixelReady]);

  const trackButtonClick = useCallback((buttonName: string) => {
    if (pixelReady && window.fbq) window.fbq("trackCustom", "ButtonClick", { button: buttonName });
  }, [pixelReady]);

  return (
    <AnalyticsContext.Provider value={{ trackPageView, trackLead, trackPurchase, trackInitiateCheckout, trackViewContent, trackButtonClick, pixelReady }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
