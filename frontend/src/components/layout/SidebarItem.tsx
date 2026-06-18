import { type LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  collapsed?: boolean;
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  isActive = false,
  collapsed = false,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-200 py-150 pr-300 transition-colors
        ${collapsed ? "justify-center pl-300" : "pl-200"}
        ${
          isActive
            ? "bg-beige-100 text-grey-900 border-l-4 border-green rounded-r-xl"
            : "text-grey-300 hover:text-white border-l-4 border-transparent"
        }
      `}
    >
      <Icon
        size={20}
        className={`shrink-0 ${isActive ? "text-green" : ""}`}
      />
      {!collapsed && (
        <span className="text-preset-4-bold truncate">{label}</span>
      )}
    </Link>
  );
}
