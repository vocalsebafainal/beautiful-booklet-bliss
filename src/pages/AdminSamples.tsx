import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Video, ExternalLink } from "lucide-react";

const emptyForm = {
  category_name: "",
  category_emoji: "🎤",
  video_url: "",
  display_order: 0,
  is_active: true,
};

export default function AdminSamples() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: samples = [], isLoading } = useQuery({
    queryKey: ["admin-samples"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("samples")
        .select("*")
        .order("category_name")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (values: typeof form & { id?: string }) => {
      const { id, ...rest } = values;
      if (id) {
        const { error } = await supabase.from("samples").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("samples").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-samples"] });
      toast.success(editing ? "স্যাম্পল আপডেট হয়েছে" : "স্যাম্পল যোগ হয়েছে");
      closeDialog();
    },
    onError: (e: any) => toast.error(e.message || "কিছু ভুল হয়েছে"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("samples").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-samples"] });
      toast.success("স্যাম্পল মুছে ফেলা হয়েছে");
    },
    onError: (e: any) => toast.error(e.message || "ডিলিট করা যায়নি"),
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const openEdit = (s: any) => {
    setEditing(s);
    setForm({
      category_name: s.category_name,
      category_emoji: s.category_emoji,
      video_url: s.video_url,
      display_order: s.display_order,
      is_active: s.is_active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category_name || !form.video_url) {
      toast.error("ক্যাটাগরি নাম ও ভিডিও URL আবশ্যক");
      return;
    }
    saveMutation.mutate(editing ? { ...form, id: editing.id } : form);
  };

  // Group samples by category
  const grouped = samples.reduce<Record<string, any[]>>((acc, s) => {
    if (!acc[s.category_name]) acc[s.category_name] = [];
    acc[s.category_name].push(s);
    return acc;
  }, {});

  const getYouTubeVideoId = (url: string): string | null => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) {
        const v = u.searchParams.get("v");
        if (v) return v;
        if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/shorts/")[1]?.split("?")[0];
      } else if (u.hostname.includes("youtu.be")) {
        return u.pathname.slice(1).split("?")[0];
      }
    } catch {}
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">স্যাম্পল ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground text-sm">স্যাম্পল ভিডিও লিংক যোগ, এডিট ও মুছুন</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(v) => { if (!v) closeDialog(); else setDialogOpen(true); }}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing(null); setForm(emptyForm); }}>
              <Plus className="w-4 h-4 mr-2" /> নতুন স্যাম্পল
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editing ? "স্যাম্পল এডিট" : "নতুন স্যাম্পল যোগ"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>ক্যাটাগরি নাম *</Label>
                <Input value={form.category_name} onChange={(e) => setForm({ ...form, category_name: e.target.value })} placeholder="যেমন: নিউজ ভয়েস" />
              </div>
              <div>
                <Label>ক্যাটাগরি ইমোজি</Label>
                <Input value={form.category_emoji} onChange={(e) => setForm({ ...form, category_emoji: e.target.value })} placeholder="🎤" />
              </div>
              <div>
                <Label>ভিডিও URL *</Label>
                <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." />
              </div>
              <div>
                <Label>ডিসপ্লে অর্ডার</Label>
                <Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <Label>অ্যাক্টিভ</Label>
              </div>
              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editing ? "আপডেট করুন" : "যোগ করুন"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
      ) : (
        Object.entries(grouped).map(([catName, items]) => (
          <Card key={catName}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{items[0].category_emoji} {catName} ({items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>থাম্বনেইল</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>অর্ডার</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((s: any) => {
                    const videoId = getYouTubeVideoId(s.video_url);
                    return (
                      <TableRow key={s.id}>
                        <TableCell>
                          {videoId ? (
                            <img src={`https://img.youtube.com/vi/${videoId}/default.jpg`} alt="" className="w-20 h-14 object-cover rounded" />
                          ) : (
                            <div className="w-20 h-14 rounded bg-muted flex items-center justify-center">
                              <ExternalLink className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-xs">{s.video_url}</TableCell>
                        <TableCell>{s.display_order}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {s.is_active ? "অ্যাক্টিভ" : "নিষ্ক্রিয়"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil className="w-4 h-4" /></Button>
                          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => { if (confirm("মুছে ফেলতে চান?")) deleteMutation.mutate(s.id); }}><Trash2 className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      )}

      {!isLoading && samples.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>কোনো স্যাম্পল নেই। উপরের বাটনে ক্লিক করে যোগ করুন।</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
