import { type LucideIcon, Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  description?: string;
  icon?: LucideIcon;
}

export function EmptyState({
  message = "No data yet",
  description,
  icon: Icon = Inbox,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-200 py-500 text-center">
      <Icon size={48} className="text-grey-300" />
      <div>
        <p className="text-preset-3 text-grey-900">{message}</p>
        {description && (
          <p className="text-preset-4 text-grey-500 mt-100">{description}</p>
        )}
      </div>
    </div>
  );
}
