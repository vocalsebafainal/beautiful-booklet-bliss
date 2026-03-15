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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Search, Plus, Loader2, Pencil, Trash2, Upload, Image } from "lucide-react";

const CATEGORY_OPTIONS = [
  "পুরুষ কণ্ঠ",
  "নারী কণ্ঠ",
  "শিশু কণ্ঠ",
  "ডুয়েট",
  "কোরাস",
  "র‍্যাপ",
  "ন্যারেশন",
];

export default function AdminArtists() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const queryClient = useQueryClient();

  const { data: artists = [], isLoading } = useQuery({
    queryKey: ["admin-artists"],
    queryFn: async () => {
      const { data } = await supabase.from("artists").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("artist-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("artist-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async (artist: any) => {
      if (imageFile) {
        artist.image_url = await uploadImage(imageFile);
      }
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
      queryClient.invalidateQueries({ queryKey: ["public-artists"] });
      toast.success(editing ? "আর্টিস্ট আপডেট হয়েছে" : "নতুন আর্টিস্ট যোগ হয়েছে");
      closeDialog();
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("artists").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-artists"] });
      queryClient.invalidateQueries({ queryKey: ["public-artists"] });
      toast.success("আর্টিস্ট ডিলিট হয়েছে");
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
    (a.category && a.category.toLowerCase().includes(search.toLowerCase())) ||
    (a.specialization && a.specialization.toLowerCase().includes(search.toLowerCase()))
  );

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setImageFile(null);
    setImagePreview(null);
    setSelectedCategory("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!selectedCategory) {
      toast.error("ক্যাটাগরি সিলেক্ট করুন");
      return;
    }
    const data: any = {
      name: fd.get("name") as string,
      category: selectedCategory,
      country: fd.get("country") as string,
      phone: fd.get("phone") as string,
      specialization: selectedCategory,
      sample_video_url: (fd.get("sample_video_url") as string) || null,
    };
    if (editing) data.id = editing.id;
    saveMutation.mutate(data);
  };

  const currentImage = imagePreview || editing?.image_url;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">আর্টিস্ট ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground text-sm">কণ্ঠশিল্পীদের প্রোফাইল পরিচালনা করুন</p>
        </div>
        <Button onClick={() => { setEditing(null); setImageFile(null); setImagePreview(null); setSelectedCategory(""); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> নতুন আর্টিস্ট
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="নাম বা ক্যাটাগরি দিয়ে সার্চ..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ছবি</TableHead>
                  <TableHead>নাম</TableHead>
                  <TableHead>ক্যাটাগরি</TableHead>
                  <TableHead>দেশ</TableHead>
                  <TableHead>ফোন</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead>অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a: any) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      {a.image_url ? (
                        <img src={a.image_url} alt={a.name} className="w-10 h-10 rounded-full object-cover border border-border" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Image className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell>
                      {(a.category || a.specialization) ? (
                        <Badge variant="secondary" className="text-xs">{a.category || a.specialization}</Badge>
                      ) : "—"}
                    </TableCell>
                    <TableCell>{a.country || "—"}</TableCell>
                    <TableCell>{a.phone || "—"}</TableCell>
                    <TableCell>
                      <Switch
                        checked={a.status === "active"}
                        onCheckedChange={() => toggleStatus.mutate({ id: a.id, status: a.status })}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => { setEditing(a); setImagePreview(null); setImageFile(null); setSelectedCategory(a.category || a.specialization || ""); setDialogOpen(true); }}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            if (confirm("এই আর্টিস্ট ডিলিট করতে চান?")) {
                              deleteMutation.mutate(a.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">কোনো আর্টিস্ট পাওয়া যায়নি</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "আর্টিস্ট এডিট" : "নতুন আর্টিস্ট"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            {/* Image Upload */}
            <div className="flex flex-col items-center gap-3">
              {currentImage ? (
                <img src={currentImage} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-primary/30" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <Label htmlFor="artist-image" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Upload className="h-4 w-4" />
                  ছবি আপলোড করুন
                </div>
              </Label>
              <input id="artist-image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            <div className="space-y-2"><Label>নাম *</Label><Input name="name" defaultValue={editing?.name} required /></div>
            <div className="space-y-2"><Label>ক্যাটাগরি *</Label><Input name="category" defaultValue={editing?.category || editing?.specialization} placeholder="যেমন: পুরুষ কণ্ঠ, নারী কণ্ঠ, শিশু কণ্ঠ" required /></div>
            <div className="space-y-2"><Label>দেশ</Label><Input name="country" defaultValue={editing?.country || "বাংলাদেশ"} /></div>
            <div className="space-y-2"><Label>ফোন</Label><Input name="phone" defaultValue={editing?.phone} /></div>
            <div className="space-y-2"><Label>স্যাম্পল ভিডিও লিংক</Label><Input name="sample_video_url" defaultValue={editing?.sample_video_url} placeholder="https://www.youtube.com/watch?v=..." /></div>
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
