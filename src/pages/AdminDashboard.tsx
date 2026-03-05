import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/admin/StatCard";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { ShoppingCart, Users, Mic, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export default function AdminDashboard() {
  const { data: orders = [] } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["admin-clients"],
    queryFn: async () => {
      const { data } = await supabase.from("clients").select("*");
      return data || [];
    },
  });

  const { data: artists = [] } = useQuery({
    queryKey: ["admin-artists"],
    queryFn: async () => {
      const { data } = await supabase.from("artists").select("*");
      return data || [];
    },
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const activeArtists = artists.filter((a) => a.status === "active").length;

  const statusLabels: Record<string, string> = {
    pending: "পেন্ডিং",
    in_progress: "প্রক্রিয়াধীন",
    recording: "রেকর্ডিং",
    delivered: "ডেলিভার্ড",
    cancelled: "বাতিল",
  };

  const ordersByStatus = Object.entries(
    orders.reduce((acc: Record<string, number>, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, value]) => ({ name: statusLabels[status] || status, value }));

  const monthlyRevenue = Object.entries(
    orders.reduce((acc: Record<string, number>, o) => {
      const month = format(new Date(o.created_at), "MMM yyyy");
      acc[month] = (acc[month] || 0) + (o.amount || 0);
      return acc;
    }, {})
  )
    .map(([month, amount]) => ({ month, amount }))
    .slice(-6);

  const recentOrders = orders.slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">ড্যাশবোর্ড</h2>
        <p className="text-muted-foreground text-sm">Vocalseba Agency-র সামগ্রিক পরিসংখ্যান</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="মোট অর্ডার" value={orders.length} icon={ShoppingCart} index={0} />
        <StatCard title="মোট রেভিনিউ" value={`৳${totalRevenue.toLocaleString()}`} icon={DollarSign} index={1} />
        <StatCard title="ক্লায়েন্ট" value={clients.length} icon={Users} index={2} />
        <StatCard title="অ্যাক্টিভ আর্টিস্ট" value={activeArtists} icon={Mic} index={3} />
      </div>

      <DashboardCharts ordersByStatus={ordersByStatus} monthlyRevenue={monthlyRevenue} />

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">সাম্প্রতিক অর্ডার</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>অর্ডার ID</TableHead>
                  <TableHead>ক্লায়েন্ট</TableHead>
                  <TableHead>ক্যাটেগরি</TableHead>
                  <TableHead>পরিমাণ</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead>তারিখ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm font-medium">{order.order_id}</TableCell>
                    <TableCell>{order.client_name}</TableCell>
                    <TableCell>{order.category}</TableCell>
                    <TableCell>৳{order.amount.toLocaleString()}</TableCell>
                    <TableCell><OrderStatusBadge status={order.status} /></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{format(new Date(order.created_at), "dd MMM yyyy")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-8">এখনো কোনো অর্ডার নেই।</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
