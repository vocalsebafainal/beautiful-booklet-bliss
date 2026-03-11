import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Search, Plus, Loader2, Pencil, Star } from "lucide-react";

export default function AdminArtists() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: artists = [], isLoading } = useQuery({
    queryKey: ["admin-artists"],
    queryFn: async () => {
      const { data } = await supabase.from("artists").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (artist: any) => {
      if (artist.id) {
        const { id, ...rest } = artist;
        const { error } = await supabase.from("artists").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("artists").insert(artist);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-artists"] });
      toast.success(editing ? "আর্টিস্ট আপডেট হয়েছে" : "নতুন আর্টিস্ট যোগ হয়েছে");
      setDialogOpen(false);
      setEditing(null);
    },
  });

  const toggleStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const newStatus = status === "active" ? "inactive" : "active";
      const { error } = await supabase.from("artists").update({ status: newStatus }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-artists"] });
      toast.success("স্ট্যাটাস পরিবর্তন হয়েছে");
    },
  });

  const filtered = artists.filter((a: any) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    (a.specialization && a.specialization.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: any = {
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      specialization: fd.get("specialization") as string,
      rate_per_project: Number(fd.get("rate_per_project")) || 0,
      sample_video_url: (fd.get("sample_video_url") as string) || null,
    };
    if (editing) data.id = editing.id;
    saveMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">আর্টিস্ট ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground text-sm">কণ্ঠশিল্পীদের প্রোফাইল পরিচালনা করুন</p>
        </div>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> নতুন আর্টিস্ট
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="নাম বা বিশেষত্ব দিয়ে সার্চ..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>নাম</TableHead>
                  <TableHead>বিশেষত্ব</TableHead>
                  <TableHead>ফোন</TableHead>
                  <TableHead>রেট/প্রজেক্ট</TableHead>
                  <TableHead>প্রজেক্ট</TableHead>
                  <TableHead>রেটিং</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a: any) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell>
                      {a.specialization ? (
                        <Badge variant="secondary" className="text-xs">{a.specialization}</Badge>
                      ) : "—"}
                    </TableCell>
                    <TableCell>{a.phone || "—"}</TableCell>
                    <TableCell>৳{(a.rate_per_project || 0).toLocaleString()}</TableCell>
                    <TableCell>{a.total_projects || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{a.rating || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={a.status === "active"}
                        onCheckedChange={() => toggleStatus.mutate({ id: a.id, status: a.status })}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(a); setDialogOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">কোনো আর্টিস্ট পাওয়া যায়নি</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "আর্টিস্ট এডিট" : "নতুন আর্টিস্ট"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2"><Label>নাম *</Label><Input name="name" defaultValue={editing?.name} required /></div>
            <div className="space-y-2"><Label>ফোন</Label><Input name="phone" defaultValue={editing?.phone} /></div>
            <div className="space-y-2"><Label>বিশেষত্ব</Label><Input name="specialization" defaultValue={editing?.specialization} placeholder="যেমন: পুরুষ কণ্ঠ, নারী কণ্ঠ, শিশু কণ্ঠ" /></div>
            <div className="space-y-2"><Label>রেট/প্রজেক্ট (৳)</Label><Input name="rate_per_project" type="number" defaultValue={editing?.rate_per_project} /></div>
            <div className="space-y-2"><Label>স্যাম্পল ভিডিও URL</Label><Input name="sample_video_url" defaultValue={editing?.sample_video_url} placeholder="YouTube embed URL (যেমন: https://www.youtube.com/embed/...)" /></div>
            <Button type="submit" className="w-full">{editing ? "আপডেট" : "যোগ করুন"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
