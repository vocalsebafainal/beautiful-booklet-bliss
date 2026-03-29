import { useState, useEffect } from "react";
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

  const { data: pixelConfig, isLoading } = useQuery({
    queryKey: ["marketing-config", "fb_pixel_id"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketing_configs")
        .select("*")
        .eq("config_name", "fb_pixel_id")
        .single();
      if (error) throw error;
      return data;
    },
  });

  const [pixelId, setPixelId] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Sync state when data loads
  if (pixelConfig && !initialized) {
    setPixelId(pixelConfig.config_value || "");
    setIsActive(pixelConfig.is_active);
    setInitialized(true);
  }

  const updateMutation = useMutation({
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

      <Card className="border-border/50 bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
              <Facebook className="h-5 w-5 text-blue-500" />
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
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
            />
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
            onClick={() => updateMutation.mutate()}
            disabled={updateMutation.isPending}
            className="w-full"
          >
            {updateMutation.isPending ? (
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
