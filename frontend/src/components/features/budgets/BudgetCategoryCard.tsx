import { ColorDot } from "@/components/ui/ColorDot";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardCardHeader } from "@/components/ui/DashboardCardHeader";
import { RecipientListItem } from "@/components/ui/RecipientListItem";
import { CardOptionsMenu } from "@/components/ui/CardOptionsMenu";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate } from "@/lib/format-date";
import type { Budget } from "@/types/budget";

interface BudgetCategoryCardProps {
  budget: Budget;
  onEdit: () => void;
  onDelete: () => void;
}

export function BudgetCategoryCard({
  budget,
  onEdit,
  onDelete,
}: BudgetCategoryCardProps) {
  const { category, color, maximum, spent, latestTransactions } = budget;

  const remaining = Math.max(0, maximum - spent);
  const percentage = Math.min(100, (spent / maximum) * 100);

  return (
    <div className="bg-white rounded-2xl p-300 flex flex-col gap-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-200">
          <ColorDot color={color} size="md" />
          <span className="text-preset-2 text-grey-900">{category}</span>
        </div>
        <CardOptionsMenu onEdit={onEdit} onDelete={onDelete} />
      </div>

      <p className="text-preset-4 text-grey-500">
        Maximum of {formatCurrency(maximum)}
      </p>

      <ProgressBar color={color} percentage={percentage} />

      <div className="grid grid-cols-2 gap-200">
        <div
          className="flex flex-col gap-50 border-l-4 pl-200"
          style={{ borderLeftColor: `var(--color-${color})` }}
        >
          <span className="text-preset-5 text-grey-500">Spent</span>
          <span className="text-preset-4-bold text-grey-900">
            {formatCurrency(spent)}
          </span>
        </div>
        <div className="flex flex-col gap-50 border-l-4 border-beige-100 pl-200">
          <span className="text-preset-5 text-grey-500">Remaining</span>
          <span className="text-preset-4-bold text-grey-900">
            {formatCurrency(remaining)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-200">
        <DashboardCardHeader title="Latest Spending" />
        <div className="flex flex-col divide-y divide-grey-100">
          {latestTransactions?.slice(0, 3).map((tx) => (
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
    </div>
  );
}
