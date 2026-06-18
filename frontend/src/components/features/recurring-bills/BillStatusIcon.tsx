import { CheckCircle, AlertCircle } from "lucide-react";
import type { BillStatus } from "@/types/recurring-bill";

interface BillStatusIconProps {
  status: BillStatus;
}

export function BillStatusIcon({ status }: BillStatusIconProps) {
  if (status === "paid") {
    return <CheckCircle size={16} className="text-green shrink-0" />;
  }
  if (status === "due-soon") {
    return <AlertCircle size={16} className="text-red shrink-0" />;
  }
  return null;
}
