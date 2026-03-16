import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ShieldPlus, UserCog, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface AdminUser {
  user_id: string;
  email: string;
  created_at: string | null;
}

const fetchAdminUsers = async (): Promise<AdminUser[]> => {
  const { data, error } = await supabase.functions.invoke("admin-users", {
    method: "GET",
  });

  if (error) throw error;
  return Array.isArray(data?.admins) ? data.admins : [];
};

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");

  const { data: admins = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchAdminUsers,
  });

  const createAdminMutation = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data, error } = await supabase.functions.invoke("admin-users", {
        method: "POST",
        body: payload,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("অ্যাডমিন যোগ হয়েছে");
      setEmail("");
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) => {
      toast.error("অ্যাডমিন যোগ করা যায়নি", {
        description: error?.message || "আবার চেষ্টা করুন।",
      });
    },
  });

  const removeAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke("admin-users", {
        method: "DELETE",
        body: { userId },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("অ্যাডমিন role সরানো হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) => {
      toast.error("অ্যাডমিন role সরানো যায়নি", {
        description: error?.message || "আবার চেষ্টা করুন।",
      });
    },
  });

  const filteredAdmins = useMemo(
    () => admins.filter((admin) => admin.email.toLowerCase().includes(search.toLowerCase())),
    [admins, search],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }

    if (password.trim().length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    createAdminMutation.mutate({
      email: email.trim(),
      password: password.trim(),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">অ্যাডমিন ইউজারস</h2>
        <p className="text-sm text-muted-foreground">এখান থেকে নতুন admin add করুন এবং access manage করুন</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px,1fr]">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldPlus className="h-4 w-4 text-primary" />
              নতুন অ্যাডমিন যোগ করুন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">ইমেইল</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@vocalseba.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">পাসওয়ার্ড</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={createAdminMutation.isPending}>
                {createAdminMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    যোগ করা হচ্ছে...
                  </>
                ) : (
                  "Admin Add করুন"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <UserCog className="h-4 w-4 text-primary" />
              বর্তমান অ্যাডমিন লিস্ট
            </CardTitle>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ইমেইল দিয়ে সার্চ..."
              className="sm:max-w-xs"
            />
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : filteredAdmins.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ইমেইল</TableHead>
                    <TableHead>তৈরির তারিখ</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.map((admin) => (
                    <TableRow key={admin.user_id}>
                      <TableCell className="font-medium">{admin.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {admin.created_at ? format(new Date(admin.created_at), "dd MMM yyyy") : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => {
                            if (confirm(`${admin.email} এর admin access remove করতে চান?`)) {
                              removeAdminMutation.mutate(admin.user_id);
                            }
                          }}
                          disabled={removeAdminMutation.isPending}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-12 text-center text-sm text-muted-foreground">কোনো অ্যাডমিন পাওয়া যায়নি</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
