import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-beige-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-300 pb-[88px] md:pb-300">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
