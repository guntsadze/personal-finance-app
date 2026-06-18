import { ChevronRight } from "lucide-react";

interface DashboardCardHeaderProps {
  title: string;
  linkLabel?: string;
  onLinkClick?: () => void;
}

export function DashboardCardHeader({
  title,
  linkLabel,
  onLinkClick,
}: DashboardCardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-preset-2 text-grey-900">{title}</h2>
      {linkLabel && (
        <button
          onClick={onLinkClick}
          className="inline-flex items-center gap-50 text-preset-4 text-grey-500 hover:text-grey-900 transition-colors"
        >
          {linkLabel}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
