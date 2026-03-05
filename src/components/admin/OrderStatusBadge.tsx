import { Badge } from "@/components/ui/badge";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "পেন্ডিং", variant: "outline" },
  in_progress: { label: "প্রক্রিয়াধীন", variant: "secondary" },
  recording: { label: "রেকর্ডিং", variant: "default" },
  delivered: { label: "ডেলিভার্ড", variant: "default" },
  cancelled: { label: "বাতিল", variant: "destructive" },
};

export function OrderStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, variant: "outline" as const };
  
  return (
    <Badge variant={config.variant} className="text-xs">
      {config.label}
    </Badge>
  );
}
