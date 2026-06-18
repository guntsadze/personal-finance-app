import { DashboardCardHeader } from "@/components/ui/DashboardCardHeader";
import { RecipientListItem } from "@/components/ui/RecipientListItem";
import { formatDate } from "@/lib/format-date";
import type { Transaction } from "@/types/transaction";

interface TransactionsSummaryCardProps {
  transactions: Transaction[];
  onViewAll?: () => void;
}

export function TransactionsSummaryCard({
  transactions,
  onViewAll,
}: TransactionsSummaryCardProps) {
  const latest = transactions.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl p-300 flex flex-col gap-300">
      <DashboardCardHeader
        title="Transactions"
        linkLabel="View All"
        onLinkClick={onViewAll}
      />

      <div className="flex flex-col divide-y divide-grey-100">
        {latest.map((tx) => (
          <RecipientListItem
            key={tx.id}
            name={tx.name}
            avatarUrl={tx.avatarUrl}
            avatarColor={tx.avatarColor}
            amount={tx.amount}
            date={formatDate(tx.date)}
          />
        ))}
      </div>
    </div>
  );
}
