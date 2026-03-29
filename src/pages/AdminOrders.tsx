import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { Search, Plus, Loader2 } from "lucide-react";

const statuses = ["pending", "in_progress", "recording", "delivered", "cancelled"];

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, artists(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const { data: artists = [] } = useQuery({
    queryKey: ["admin-artists"],
    queryFn: async () => {
      const { data } = await supabase.from("artists").select("*").eq("status", "active");
      return data || [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { data, error } = await supabase.from("orders").update(updates).eq("id", id).select().maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("অর্ডার আপডেট হয়নি");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("অর্ডার আপডেট হয়েছে");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "আপডেট ব্যর্থ হয়েছে"),
  });

  const createMutation = useMutation({
    mutationFn: async (order: any) => {
      const { data, error } = await supabase.from("orders").insert(order).select().maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("অর্ডার তৈরি হয়নি");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("নতুন অর্ডার তৈরি হয়েছে");
      setDialogOpen(false);
      setEditingOrder(null);
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "অর্ডার তৈরি ব্যর্থ হয়েছে"),
  });

  const filtered = orders.filter((o: any) => {
    const matchSearch = o.order_id.toLowerCase().includes(search.toLowerCase()) ||
      o.client_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: any = {
      client_name: (fd.get("client_name") as string).trim(),
      client_phone: fd.get("client_phone") as string,
      client_email: fd.get("client_email") as string,
      category: fd.get("category") as string,
      tier: fd.get("tier") as string,
      amount: Number(fd.get("amount")),
      payment_method: fd.get("payment_method") as string,
      transaction_id: fd.get("transaction_id") as string,
      script_text: fd.get("script_text") as string,
      notes: fd.get("notes") as string,
    };

    if (!data.client_name) {
      toast.error("ক্লায়েন্ট নাম দিন");
      return;
    }

    if (editingOrder) {
      updateMutation.mutate({ id: editingOrder.id, ...data });
      setDialogOpen(false);
      setEditingOrder(null);
    } else {
      data.order_id = "";
      createMutation.mutate(data);
    }
  };

  const isSaving = updateMutation.isPending || createMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">অর্ডার ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground text-sm">সব অর্ডার দেখুন ও পরিচালনা করুন</p>
        </div>
        <Button onClick={() => { setEditingOrder(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> নতুন অর্ডার
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="অর্ডার ID বা ক্লায়েন্ট নামে সার্চ..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="স্ট্যাটাস ফিল্টার" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
            {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
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
                    <TableHead>অর্ডার ID</TableHead>
                    <TableHead>ক্লায়েন্ট</TableHead>
                    <TableHead className="hidden md:table-cell">ক্যাটেগরি</TableHead>
                    <TableHead className="hidden md:table-cell">টিয়ার</TableHead>
                    <TableHead>পরিমাণ</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="hidden lg:table-cell">আর্টিস্ট</TableHead>
                    <TableHead className="hidden md:table-cell">তারিখ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order: any) => (
                    <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => { setEditingOrder(order); setDialogOpen(true); }}>
                      <TableCell className="font-mono text-sm font-medium">{order.order_id}</TableCell>
                      <TableCell>{order.client_name}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.tier}</TableCell>
                      <TableCell>৳{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(val) => updateMutation.mutate({ id: order.id, status: val })}
                        >
                          <SelectTrigger className="w-[140px] h-8" onClick={(e) => e.stopPropagation()}>
                            <OrderStatusBadge status={order.status} />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Select
                          value={order.assigned_artist_id || "none"}
                          onValueChange={(val) => updateMutation.mutate({ id: order.id, assigned_artist_id: val === "none" ? null : val })}
                        >
                          <SelectTrigger className="w-[140px] h-8" onClick={(e) => e.stopPropagation()}>
                            <SelectValue placeholder="অ্যাসাইন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">কেউ না</SelectItem>
                            {artists.map((a: any) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{format(new Date(order.created_at), "dd MMM yyyy")}</TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">কোনো অর্ডার পাওয়া যায়নি</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingOrder ? `অর্ডার: ${editingOrder.order_id}` : "নতুন অর্ডার"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ক্লায়েন্ট নাম *</Label>
                <Input name="client_name" defaultValue={editingOrder?.client_name} required />
              </div>
              <div className="space-y-2">
                <Label>ফোন</Label>
                <Input name="client_phone" defaultValue={editingOrder?.client_phone} />
              </div>
              <div className="space-y-2">
                <Label>ইমেইল</Label>
                <Input name="client_email" defaultValue={editingOrder?.client_email} />
              </div>
              <div className="space-y-2">
                <Label>ক্যাটেগরি *</Label>
                <Input name="category" defaultValue={editingOrder?.category} required />
              </div>
              <div className="space-y-2">
                <Label>টিয়ার *</Label>
                <Input name="tier" defaultValue={editingOrder?.tier} required />
              </div>
              <div className="space-y-2">
                <Label>পরিমাণ (৳) *</Label>
                <Input name="amount" type="number" defaultValue={editingOrder?.amount} required />
              </div>
              <div className="space-y-2">
                <Label>পেমেন্ট মেথড</Label>
                <Input name="payment_method" defaultValue={editingOrder?.payment_method} />
              </div>
              <div className="space-y-2">
                <Label>ট্রানজেকশন ID</Label>
                <Input name="transaction_id" defaultValue={editingOrder?.transaction_id} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>স্ক্রিপ্ট</Label>
              <Textarea name="script_text" defaultValue={editingOrder?.script_text} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>নোট</Label>
              <Textarea name="notes" defaultValue={editingOrder?.notes} rows={2} />
            </div>
            <Button type="submit" className="w-full" disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingOrder ? "আপডেট করুন" : "অর্ডার তৈরি করুন"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
