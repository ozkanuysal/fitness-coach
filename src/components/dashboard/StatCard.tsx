import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface border border-border p-6",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">{title}</p>
        <div className="text-primary">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {trend && <p className="text-xs text-primary mt-1">{trend}</p>}
    </div>
  );
}
