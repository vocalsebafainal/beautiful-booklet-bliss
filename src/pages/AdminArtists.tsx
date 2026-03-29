import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
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
import { Search, Plus, Loader2, Pencil, Trash2, Upload, Image, ExternalLink } from "lucide-react";

const CATEGORY_OPTIONS = [
  "পুরুষ কণ্ঠ",
  "নারী কণ্ঠ",
  "শিশু কণ্ঠ",
  "ডুয়েট",
  "কোরাস",
  "র‍্যাপ",
  "ন্যারেশন",
];

const CUSTOM_CATEGORY_VALUE = "__custom__";
const EMPTY_CATEGORY_VALUE = "__none__";

type ArtistPayload = TablesInsert<"artists"> & { id?: string };

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message.toLowerCase().includes("row-level security")) {
      return "আপনার অ্যাডমিন অনুমতি যাচাই করা যায়নি, আবার লগইন করে চেষ্টা করুন";
    }
    return error.message;
  }
  return "অপারেশন সম্পন্ন হয়নি, আবার চেষ্টা করুন";
};

const isValidVideoUrl = (url: string) => {
  if (!url) return true;
  try {
    const u = new URL(url);
    return (
      u.protocol === "https:" || u.protocol === "http:" ||
      u.hostname.includes("youtube.com") ||
      u.hostname.includes("youtu.be") ||
      url.endsWith(".mp4")
    );
  } catch {
    return false;
  }
};

export default function AdminArtists() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const queryClient = useQueryClient();

  const { data: artists = [], isLoading } = useQuery({
    queryKey: ["admin-artists"],
    queryFn: async () => {
      const { data, error } = await supabase.from("artists").select("*").order("created_at", { ascending: false });
      if (error) throw error;
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
    retry: false,
    mutationFn: async (artist: ArtistPayload) => {
      const payload: ArtistPayload = { ...artist };

      if (imageFile) {
        payload.image_url = await uploadImage(imageFile);
      }

      if (payload.id) {
        const { id, ...rest } = payload;
        const { data, error } = await supabase
          .from("artists")
          .update(rest as TablesUpdate<"artists">)
          .eq("id", id)
          .select()
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("আর্টিস্ট আপডেট সম্পন্ন হয়নি, আবার চেষ্টা করুন");
        return data;
      }

      const { data, error } = await supabase
        .from("artists")
        .insert(payload as TablesInsert<"artists">)
        .select()
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("নতুন আর্টিস্ট সেভ হয়নি, আবার চেষ্টা করুন");
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("artists").delete().eq("id", id).select();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-artists"] });
      queryClient.invalidateQueries({ queryKey: ["public-artists"] });
      toast.success("আর্টিস্ট ডিলিট হয়েছে");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const toggleStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const newStatus = status === "active" ? "inactive" : "active";
      const { data, error } = await supabase
        .from("artists")
        .update({ status: newStatus })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("স্ট্যাটাস পরিবর্তন হয়নি");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-artists"] });
      toast.success("স্ট্যাটাস পরিবর্তন হয়েছে");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
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
    setCustomCategory("");
    saveMutation.reset();
  };

  const openCreateDialog = () => {
    setEditing(null);
    setImageFile(null);
    setImagePreview(null);
    setSelectedCategory("");
    setCustomCategory("");
    saveMutation.reset();
    setDialogOpen(true);
  };

  const openEditDialog = (artist: any) => {
    const existingCategory = artist.category || artist.specialization || "";
    setEditing(artist);
    setImagePreview(null);
    setImageFile(null);
    setSelectedCategory(
      CATEGORY_OPTIONS.includes(existingCategory)
        ? existingCategory
        : existingCategory
          ? CUSTOM_CATEGORY_VALUE
          : EMPTY_CATEGORY_VALUE
    );
    setCustomCategory(CATEGORY_OPTIONS.includes(existingCategory) ? "" : existingCategory);
    saveMutation.reset();
    setDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string).trim();
    const videoUrl = (fd.get("sample_video_url") as string || "").trim();
    const phone = (fd.get("phone") as string || "").trim();

    // Validation
    if (name.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষর হতে হবে");
      return;
    }

    if (videoUrl && !isValidVideoUrl(videoUrl)) {
      toast.error("সঠিক ভিডিও লিংক দিন (YouTube বা MP4)");
      return;
    }

    const finalCategory = selectedCategory === CUSTOM_CATEGORY_VALUE
      ? customCategory.trim()
      : selectedCategory === EMPTY_CATEGORY_VALUE
        ? ""
        : selectedCategory;

    if (selectedCategory === CUSTOM_CATEGORY_VALUE && !finalCategory) {
      toast.error("নতুন ক্যাটাগরি লিখুন");
      return;
    }

    const data: ArtistPayload = {
      name,
      category: finalCategory || null,
      country: (fd.get("country") as string) || null,
      phone: phone || null,
      specialization: finalCategory || null,
      sample_video_url: videoUrl || null,
      rate_per_project: Number(fd.get("rate_per_project")) || 0,
    };
    if (editing) data.id = editing.id;

    saveMutation.reset();

    try {
      await saveMutation.mutateAsync(data);
      closeDialog();
      toast.success(editing ? "আর্টিস্ট আপডেট হয়েছে" : "নতুন আর্টিস্ট যোগ হয়েছে");
      void queryClient.invalidateQueries({ queryKey: ["admin-artists"] });
      void queryClient.invalidateQueries({ queryKey: ["public-artists"] });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const currentImage = imagePreview || editing?.image_url;
  const saveErrorMessage = saveMutation.error ? getErrorMessage(saveMutation.error) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">আর্টিস্ট ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground text-sm">কণ্ঠশিল্পীদের প্রোফাইল পরিচালনা করুন</p>
        </div>
        <Button onClick={openCreateDialog}>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ছবি</TableHead>
                    <TableHead>নাম</TableHead>
                    <TableHead>ক্যাটাগরি</TableHead>
                    <TableHead className="hidden md:table-cell">দেশ</TableHead>
                    <TableHead className="hidden md:table-cell">ফোন</TableHead>
                    <TableHead>ভিডিও</TableHead>
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
                      <TableCell className="hidden md:table-cell">{a.country || "—"}</TableCell>
                      <TableCell className="hidden md:table-cell">{a.phone || "—"}</TableCell>
                      <TableCell>
                        {a.sample_video_url ? (
                          <a href={a.sample_video_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 text-xs">
                            <ExternalLink className="h-3 w-3" /> দেখুন
                          </a>
                        ) : "—"}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={a.status === "active"}
                          onCheckedChange={() => toggleStatus.mutate({ id: a.id, status: a.status })}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(a)}>
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
                    <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">কোনো আর্টিস্ট পাওয়া যায়নি</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
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

            <div className="space-y-2"><Label>নাম *</Label><Input name="name" defaultValue={editing?.name} required minLength={2} /></div>
            <div className="space-y-2">
              <Label>ক্যাটাগরি *</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="ক্যাটাগরি সিলেক্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EMPTY_CATEGORY_VALUE}>ক্যাটাগরি ছাড়াই রাখুন</SelectItem>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                  <SelectItem value={CUSTOM_CATEGORY_VALUE}>নতুন ক্যাটাগরি লিখুন</SelectItem>
                </SelectContent>
              </Select>
              {selectedCategory === CUSTOM_CATEGORY_VALUE && (
                <Input
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="নতুন ক্যাটাগরি লিখুন"
                />
              )}
            </div>
            <div className="space-y-2"><Label>দেশ</Label><Input name="country" defaultValue={editing?.country || "বাংলাদেশ"} /></div>
            <div className="space-y-2"><Label>ফোন</Label><Input name="phone" defaultValue={editing?.phone} placeholder="01XXXXXXXXX" /></div>
            <div className="space-y-2"><Label>রেট (প্রতি প্রজেক্ট ৳)</Label><Input name="rate_per_project" type="number" defaultValue={editing?.rate_per_project || 0} min={0} /></div>
            <div className="space-y-2"><Label>স্যাম্পল ভিডিও লিংক</Label><Input name="sample_video_url" defaultValue={editing?.sample_video_url} placeholder="https://www.youtube.com/watch?v=..." /></div>
            {saveErrorMessage && <p className="text-sm text-destructive">{saveErrorMessage}</p>}
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
