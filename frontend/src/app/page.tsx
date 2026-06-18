import { redirect } from "next/navigation";

// This file must not exist alongside (dashboard)/page.tsx — both resolve to /.
// Delete this file; (dashboard)/page.tsx is the real root route.
export default function RootPage() {
  redirect("/login");
}
