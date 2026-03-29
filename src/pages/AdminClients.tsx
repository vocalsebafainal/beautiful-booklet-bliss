import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { Search, Plus, Loader2, Pencil } from "lucide-react";

export default function AdminClients() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["admin-clients"],
    queryFn: async () => {
      const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (client: any) => {
      if (client.id) {
        const { id, ...rest } = client;
        const { data, error } = await supabase.from("clients").update(rest).eq("id", id).select().maybeSingle();
        if (error) throw error;
        if (!data) throw new Error("ক্লায়েন্ট আপডেট হয়নি");
        return data;
      } else {
        const { data, error } = await supabase.from("clients").insert(client).select().maybeSingle();
        if (error) throw error;
        if (!data) throw new Error("ক্লায়েন্ট সেভ হয়নি");
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-clients"] });
      toast.success(editing ? "ক্লায়েন্ট আপডেট হয়েছে" : "নতুন ক্লায়েন্ট যোগ হয়েছে");
      setDialogOpen(false);
      setEditing(null);
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "সেভ ব্যর্থ হয়েছে"),
  });

  const filtered = clients.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone && c.phone.includes(search)) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string).trim();

    if (name.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষর হতে হবে");
      return;
    }

    const data: any = {
      name,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      notes: fd.get("notes") as string,
    };
    if (editing) data.id = editing.id;
    saveMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">ক্লায়েন্ট ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground text-sm">সব ক্লায়েন্টদের তথ্য পরিচালনা করুন</p>
        </div>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> নতুন ক্লায়েন্ট
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="নাম, ফোন বা ইমেইল দিয়ে সার্চ..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>নাম</TableHead>
                    <TableHead>ফোন</TableHead>
                    <TableHead className="hidden md:table-cell">ইমেইল</TableHead>
                    <TableHead>মোট অর্ডার</TableHead>
                    <TableHead className="hidden md:table-cell">মোট খরচ</TableHead>
                    <TableHead className="hidden md:table-cell">যোগদান</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c: any) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c.phone || "—"}</TableCell>
                      <TableCell className="hidden md:table-cell">{c.email || "—"}</TableCell>
                      <TableCell>{c.total_orders || 0}</TableCell>
                      <TableCell className="hidden md:table-cell">৳{(c.total_spent || 0).toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{format(new Date(c.created_at), "dd MMM yyyy")}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => { setEditing(c); setDialogOpen(true); }}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">কোনো ক্লায়েন্ট পাওয়া যায়নি</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "ক্লায়েন্ট এডিট" : "নতুন ক্লায়েন্ট"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2"><Label>নাম *</Label><Input name="name" defaultValue={editing?.name} required minLength={2} /></div>
            <div className="space-y-2"><Label>ফোন</Label><Input name="phone" defaultValue={editing?.phone} /></div>
            <div className="space-y-2"><Label>ইমেইল</Label><Input name="email" type="email" defaultValue={editing?.email} /></div>
            <div className="space-y-2"><Label>নোট</Label><Textarea name="notes" defaultValue={editing?.notes} rows={3} /></div>
            <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? "আপডেট" : "যোগ করুন"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
