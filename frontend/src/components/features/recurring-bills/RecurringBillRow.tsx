import { Avatar } from "@/components/ui/Avatar";
import { BillStatusIcon } from "@/components/features/recurring-bills/BillStatusIcon";
import { formatCurrency } from "@/lib/format-currency";
import type { RecurringBill } from "@/types/recurring-bill";

interface RecurringBillRowProps {
  bill: RecurringBill;
}

const dueDayLabel = (day: number) =>
  `Monthly - ${day}${day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"}`;

export function RecurringBillRow({ bill }: RecurringBillRowProps) {
  const amountClass = bill.status === "due-soon" ? "text-red" : "text-grey-900";

  return (
    <div className="flex items-center gap-200 py-200 border-b border-grey-100 last:border-0">
      {/* Avatar + name */}
      <div className="flex items-center gap-200 flex-1 min-w-0">
        <Avatar
          src={bill.avatarUrl}
          fallbackColor={bill.avatarColor}
          name={bill.name}
          size="md"
        />
        <span className="text-preset-4-bold text-grey-900 truncate">{bill.name}</span>
      </div>

      {/* Due date + status icon */}
      <div className="flex items-center gap-100 shrink-0">
        <span className="text-preset-5 text-grey-500">{dueDayLabel(bill.dueDayOfMonth)}</span>
        <BillStatusIcon status={bill.status} />
      </div>

      {/* Amount */}
      <span className={`text-preset-4-bold shrink-0 ${amountClass}`}>
        {formatCurrency(bill.amount)}
      </span>
    </div>
  );
}
