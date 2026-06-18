import { ReactNode } from "react";

// Auth pages manage their own full-bleed layout internally
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
