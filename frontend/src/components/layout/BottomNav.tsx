"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/layout/Sidebar";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-grey-900 rounded-t-[16px] flex z-40">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center gap-50 pt-200 pb-300 transition-colors border-t-4 rounded-t-[16px]
              ${
                active
                  ? "bg-beige-100 text-grey-900 border-green"
                  : "text-grey-300 hover:text-white border-transparent"
              }
            `}
          >
            <Icon
              size={20}
              className={`shrink-0 ${active ? "text-green" : ""}`}
            />
            {/* icon-only at narrowest; label visible from sm up */}
            <span className="hidden sm:block text-preset-5-bold truncate">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
