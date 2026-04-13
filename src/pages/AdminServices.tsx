import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Mic, Upload } from "lucide-react";

const emptyForm = {
  title: "",
  category_id: "",
  description: "",
  audio_url: "",
  price: 0,
  per_word_price: 0,
  express_price: 0,
  revision_charge: 0,
  delivery_time: "",
  is_active: true,
};

export default function AdminServices() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*, categories(name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, price: Number(form.price), per_word_price: Number(form.per_word_price), express_price: Number(form.express_price), revision_charge: Number(form.revision_charge) };
      if (editing) {
        const { error } = await supabase.from("services").update(payload).eq("id", editing.id).select().maybeSingle();
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert(payload).select().maybeSingle();
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast.success(editing ? "সার্ভিস আপডেট হয়েছে" : "সার্ভিস যোগ হয়েছে");
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast.success("সার্ভিস ডিলিট হয়েছে");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("service-audio").upload(path, file);
    if (error) {
      toast.error("আপলোড ব্যর্থ: " + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("service-audio").getPublicUrl(path);
    setForm((f) => ({ ...f, audio_url: urlData.publicUrl }));
    setUploading(false);
    toast.success("অডিও আপলোড হয়েছে");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setDialogOpen(false);
  };

  const openEdit = (svc: any) => {
    setEditing(svc);
    setForm({
      title: svc.title,
      category_id: svc.category_id,
      description: svc.description || "",
      audio_url: svc.audio_url || "",
      price: svc.price,
      per_word_price: svc.per_word_price || 0,
      express_price: svc.express_price || 0,
      revision_charge: svc.revision_charge || 0,
      delivery_time: svc.delivery_time || "",
      is_active: svc.is_active,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">সার্ভিস ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground text-sm">সব ভয়েস ওভার সার্ভিস ও প্রাইসিং ম্যানেজ করুন</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { if (!o) resetForm(); setDialogOpen(o); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> নতুন সার্ভিস</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "সার্ভিস এডিট" : "নতুন সার্ভিস যোগ"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>টাইটেল *</Label>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="YouTube Voice Deep" />
              </div>
              <div>
                <Label>ক্যাটাগরি *</Label>
                <Select value={form.category_id} onValueChange={(v) => setForm((f) => ({ ...f, category_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="ক্যাটাগরি বাছুন" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>বিবরণ</Label>
                <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
              </div>
              <div>
                <Label>ডেমো অডিও</Label>
                <div className="flex gap-2 items-center">
                  <Input value={form.audio_url} onChange={(e) => setForm((f) => ({ ...f, audio_url: e.target.value }))} placeholder="URL বা আপলোড করুন" className="flex-1" />
                  <label className="cursor-pointer">
                    <input type="file" accept="audio/*" className="hidden" onChange={handleAudioUpload} />
                    <Button variant="outline" size="icon" asChild disabled={uploading}>
                      <span>{uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}</span>
                    </Button>
                  </label>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <h4 className="font-semibold text-sm mb-3">💰 প্রাইসিং</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>বেস প্রাইস (৳) *</Label>
                    <Input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} />
                  </div>
                  <div>
                    <Label>প্রতি শব্দ (৳)</Label>
                    <Input type="number" value={form.per_word_price} onChange={(e) => setForm((f) => ({ ...f, per_word_price: Number(e.target.value) }))} />
                  </div>
                  <div>
                    <Label>এক্সপ্রেস ডেলিভারি (৳)</Label>
                    <Input type="number" value={form.express_price} onChange={(e) => setForm((f) => ({ ...f, express_price: Number(e.target.value) }))} />
                  </div>
                  <div>
                    <Label>রিভিশন চার্জ (৳)</Label>
                    <Input type="number" value={form.revision_charge} onChange={(e) => setForm((f) => ({ ...f, revision_charge: Number(e.target.value) }))} />
                  </div>
                </div>
              </div>

              <div>
                <Label>ডেলিভারি টাইম</Label>
                <Input value={form.delivery_time} onChange={(e) => setForm((f) => ({ ...f, delivery_time: e.target.value }))} placeholder="২৪ ঘণ্টা" />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))} />
                <Label>অ্যাক্টিভ</Label>
              </div>
              <Button onClick={() => saveMutation.mutate()} disabled={!form.title || !form.category_id || saveMutation.isPending} className="w-full">
                {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "আপডেট করুন" : "যোগ করুন"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Mic className="h-5 w-5" /> সব সার্ভিস ({services.length})</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>টাইটেল</TableHead>
                    <TableHead>ক্যাটাগরি</TableHead>
                    <TableHead>প্রাইস</TableHead>
                    <TableHead>ডেলিভারি</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((svc: any) => (
                    <TableRow key={svc.id}>
                      <TableCell className="font-medium">{svc.title}</TableCell>
                      <TableCell>{(svc.categories as any)?.name || "—"}</TableCell>
                      <TableCell>৳{svc.price.toLocaleString()}</TableCell>
                      <TableCell>{svc.delivery_time || "—"}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${svc.is_active ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                          {svc.is_active ? "অ্যাক্টিভ" : "নিষ্ক্রিয়"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(svc)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMutation.mutate(svc.id)}><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
