import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Settings, Facebook, Save, Loader2, Video } from "lucide-react";

export default function AdminSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // --- Facebook Pixel ---
  const { data: pixelConfig, isLoading: pixelLoading } = useQuery({
    queryKey: ["marketing-config", "fb_pixel_id"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketing_configs")
        .select("*")
        .eq("config_name", "fb_pixel_id")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // --- Demo Video ---
  const { data: demoConfig, isLoading: demoLoading } = useQuery({
    queryKey: ["marketing-config", "demo_video_url"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketing_configs")
        .select("*")
        .eq("config_name", "demo_video_url")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [pixelId, setPixelId] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [pixelInit, setPixelInit] = useState(false);

  const [demoUrl, setDemoUrl] = useState("");
  const [demoActive, setDemoActive] = useState(true);
  const [demoInit, setDemoInit] = useState(false);

  if (pixelConfig && !pixelInit) {
    setPixelId(pixelConfig.config_value || "");
    setIsActive(pixelConfig.is_active);
    setPixelInit(true);
  }

  if (demoConfig && !demoInit) {
    setDemoUrl(demoConfig.config_value || "");
    setDemoActive(demoConfig.is_active);
    setDemoInit(true);
  }

  const updatePixelMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("marketing_configs")
        .update({ config_value: pixelId.trim(), is_active: isActive })
        .eq("config_name", "fb_pixel_id");
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketing-config"] });
      toast({ title: "সেভ হয়েছে!", description: "পিক্সেল সেটিংস আপডেট করা হয়েছে।" });
    },
    onError: () => {
      toast({ title: "এরর!", description: "সেভ করতে সমস্যা হয়েছে।", variant: "destructive" });
    },
  });

  const updateDemoMutation = useMutation({
    mutationFn: async () => {
      if (demoConfig) {
        const { error } = await supabase
          .from("marketing_configs")
          .update({ config_value: demoUrl.trim(), is_active: demoActive })
          .eq("config_name", "demo_video_url");
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("marketing_configs")
          .insert({ config_name: "demo_video_url", config_value: demoUrl.trim(), is_active: demoActive });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketing-config"] });
      toast({ title: "সেভ হয়েছে!", description: "ডেমো ভিডিও লিংক আপডেট করা হয়েছে।" });
    },
    onError: () => {
      toast({ title: "এরর!", description: "সেভ করতে সমস্যা হয়েছে।", variant: "destructive" });
    },
  });

  const isLoading = pixelLoading || demoLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">সেটিংস</h2>
      </div>

      {/* Demo Video Card */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Video className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">ডেমো ভিডিও</CardTitle>
              <CardDescription>হোমপেজের "আমাদের কাজ দেখুন" সেকশনের ভিডিও</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="demo-url">YouTube ভিডিও লিংক</Label>
            <Input
              id="demo-url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              YouTube এর যেকোনো লিংক দিন — স্বয়ংক্রিয়ভাবে এমবেড হবে
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border/50 p-4">
            <div>
              <p className="font-medium text-foreground">সেকশন দেখান</p>
              <p className="text-sm text-muted-foreground">
                {demoActive ? "ভিডিও সেকশন সক্রিয়" : "ভিডিও সেকশন লুকানো আছে"}
              </p>
            </div>
            <Switch checked={demoActive} onCheckedChange={setDemoActive} />
          </div>

          <Button
            onClick={() => updateDemoMutation.mutate()}
            disabled={updateDemoMutation.isPending || !demoUrl.trim()}
            className="w-full"
          >
            {updateDemoMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            সেভ করুন
          </Button>
        </CardContent>
      </Card>

      {/* Facebook Pixel Card */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Facebook className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Facebook Pixel</CardTitle>
              <CardDescription>ওয়েবসাইটে ভিজিটর ট্র্যাকিং এর জন্য</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pixel-id">Pixel ID</Label>
            <Input
              id="pixel-id"
              placeholder="যেমন: 123456789012345"
              value={pixelId}
              onChange={(e) => setPixelId(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Facebook Events Manager থেকে আপনার Pixel ID কপি করুন
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border/50 p-4">
            <div>
              <p className="font-medium text-foreground">ট্র্যাকিং চালু করুন</p>
              <p className="text-sm text-muted-foreground">
                {isActive ? "পিক্সেল এখন সক্রিয়" : "পিক্সেল বন্ধ আছে"}
              </p>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>

          {isActive && !pixelId.trim() && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3">
              <p className="text-sm text-destructive">
                ⚠️ ট্র্যাকিং চালু করতে Pixel ID দিতে হবে
              </p>
            </div>
          )}

          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <p className="text-sm font-medium text-foreground">ট্র্যাকিং ইভেন্টসমূহ:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ PageView — প্রতিটি পেজ ভিজিট</li>
              <li>✅ ViewContent — আর্টিস্ট/সার্ভিস দেখা</li>
              <li>✅ Lead — অর্ডার ফর্ম খোলা</li>
              <li>✅ InitiateCheckout — পেমেন্ট স্টেপে যাওয়া</li>
              <li>✅ Purchase — অর্ডার কনফার্ম</li>
              <li>✅ ButtonClick — WhatsApp/Call ক্লিক</li>
            </ul>
          </div>

          <Button
            onClick={() => updatePixelMutation.mutate()}
            disabled={updatePixelMutation.isPending}
            className="w-full"
          >
            {updatePixelMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            সেভ করুন
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
