import { type LucideIcon } from "lucide-react";

interface TabProps {
  label: string;
  icon?: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

export function Tab({ label, icon: Icon, isActive = false, onClick }: TabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-100 px-200 py-150 rounded-lg text-preset-4 transition-colors ${
        isActive
          ? "bg-grey-900 text-white"
          : "text-grey-500 hover:text-grey-900 hover:font-bold hover:border-b-2 hover:border-grey-900"
      }`}
    >
      {Icon && (
        <Icon
          size={16}
          className={isActive ? "text-white" : "text-grey-900 group-hover:text-grey-900"}
        />
      )}
      {label}
    </button>
  );
}
