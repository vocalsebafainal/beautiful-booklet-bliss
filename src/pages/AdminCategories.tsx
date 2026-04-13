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
import { Plus, Pencil, Trash2, Loader2, FolderOpen } from "lucide-react";

export default function AdminCategories() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: "", slug: "", image_url: "", display_order: 0, is_active: true });

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("categories").update(form).eq("id", editing.id).select().maybeSingle();
        if (error) throw error;
      } else {
        const { error } = await supabase.from("categories").insert(form).select().maybeSingle();
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success(editing ? "ক্যাটাগরি আপডেট হয়েছে" : "ক্যাটাগরি যোগ হয়েছে");
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("ক্যাটাগরি ডিলিট হয়েছে");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm({ name: "", slug: "", image_url: "", display_order: 0, is_active: true });
    setEditing(null);
    setDialogOpen(false);
  };

  const openEdit = (cat: any) => {
    setEditing(cat);
    setForm({ name: cat.name, slug: cat.slug, image_url: cat.image_url || "", display_order: cat.display_order || 0, is_active: cat.is_active });
    setDialogOpen(true);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, "-").replace(/(^-|-$)/g, "");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">ক্যাটাগরি ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground text-sm">সব ভয়েস ওভার ক্যাটাগরি ম্যানেজ করুন</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { if (!o) resetForm(); setDialogOpen(o); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> নতুন ক্যাটাগরি</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "ক্যাটাগরি এডিট" : "নতুন ক্যাটাগরি যোগ"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>নাম *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setForm((f) => ({ ...f, name, slug: editing ? f.slug : generateSlug(name) }));
                  }}
                  placeholder="যেমন: কমার্শিয়াল ভয়েস"
                />
              </div>
              <div>
                <Label>Slug *</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="commercial-voice"
                />
              </div>
              <div>
                <Label>ছবি URL</Label>
                <Input
                  value={form.image_url}
                  onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label>ক্রম</Label>
                <Input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => setForm((f) => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))} />
                <Label>অ্যাক্টিভ</Label>
              </div>
              <Button onClick={() => saveMutation.mutate()} disabled={!form.name || !form.slug || saveMutation.isPending} className="w-full">
                {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "আপডেট করুন" : "যোগ করুন"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><FolderOpen className="h-5 w-5" /> সব ক্যাটাগরি ({categories.length})</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>নাম</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>ক্রম</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat: any) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{cat.name}</TableCell>
                      <TableCell className="font-mono text-xs">{cat.slug}</TableCell>
                      <TableCell>{cat.display_order}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${cat.is_active ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                          {cat.is_active ? "অ্যাক্টিভ" : "নিষ্ক্রিয়"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMutation.mutate(cat.id)}><Trash2 className="h-4 w-4" /></Button>
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
