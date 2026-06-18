"use client";

import {
  Home,
  ArrowUpDown,
  PieChart,
  PiggyBank,
  Receipt,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarItem } from "@/components/layout/SidebarItem";

export const NAV_ITEMS = [
  { label: "Overview",        href: "/",                  icon: Home },
  { label: "Transactions",    href: "/transactions",      icon: ArrowUpDown },
  { label: "Budgets",         href: "/budgets",           icon: PieChart },
  { label: "Pots",            href: "/pots",              icon: PiggyBank },
  { label: "Recurring bills", href: "/recurring-bills",   icon: Receipt },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col bg-grey-900 rounded-r-[16px] transition-all duration-300
        ${collapsed ? "w-[72px]" : "w-[240px]"}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center gap-200 px-300 py-400 ${collapsed ? "justify-center px-0" : ""}`}>
        <div className="w-[32px] h-[32px] bg-green rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-preset-3">f</span>
        </div>
        {!collapsed && (
          <span className="text-white text-preset-2">finance</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-50 flex-1 pr-300">
        {NAV_ITEMS.map(({ label, href, icon }) => (
          <SidebarItem
            key={href}
            icon={icon}
            label={label}
            href={href}
            isActive={pathname === href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className={`flex items-center gap-200 text-grey-300 hover:text-white transition-colors py-300 px-300 mb-300
          ${collapsed ? "justify-center" : ""}
        `}
        aria-label={collapsed ? "Expand menu" : "Minimize menu"}
      >
        {collapsed ? (
          <PanelLeftOpen size={20} />
        ) : (
          <>
            <PanelLeftClose size={20} />
            <span className="text-preset-4-bold">Minimize Menu</span>
          </>
        )}
      </button>
    </aside>
  );
}
