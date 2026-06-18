import { Avatar } from "@/components/ui/Avatar";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate } from "@/lib/format-date";
import type { Transaction } from "@/types/transaction";

interface TransactionsTableProps {
  transactions: Transaction[];
}

const COL_HEADER = "text-preset-5 text-grey-500 pb-200";

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <p className="text-preset-4 text-grey-500 py-400 text-center">
        No transactions found.
      </p>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-grey-100">
              <th className={`${COL_HEADER} text-left`}>Recipient / Sender</th>
              <th className={`${COL_HEADER} text-left`}>Category</th>
              <th className={`${COL_HEADER} text-left`}>Transaction Date</th>
              <th className={`${COL_HEADER} text-right`}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-grey-100 last:border-0"
              >
                <td className="py-200">
                  <div className="flex items-center gap-200">
                    <Avatar
                      src={tx.avatarUrl}
                      fallbackColor={tx.avatarColor}
                      name={tx.name}
                      size="sm"
                    />
                    <span className="text-preset-4-bold text-grey-900 truncate max-w-[180px]">
                      {tx.name}
                    </span>
                  </div>
                </td>
                <td className="py-200 text-preset-4 text-grey-500">{tx.category}</td>
                <td className="py-200 text-preset-4 text-grey-500">
                  {formatDate(tx.date)}
                </td>
                <td className="py-200 text-right">
                  <span
                    className={`text-preset-4-bold ${
                      tx.amount > 0 ? "text-green" : "text-grey-900"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {formatCurrency(tx.amount)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col divide-y divide-grey-100 sm:hidden">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center gap-200 py-200">
            <Avatar
              src={tx.avatarUrl}
              fallbackColor={tx.avatarColor}
              name={tx.name}
              size="sm"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-preset-4-bold text-grey-900 truncate">{tx.name}</span>
              <span className="text-preset-5 text-grey-500">{tx.category}</span>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span
                className={`text-preset-4-bold ${
                  tx.amount > 0 ? "text-green" : "text-grey-900"
                }`}
              >
                {tx.amount > 0 ? "+" : ""}
                {formatCurrency(tx.amount)}
              </span>
              <span className="text-preset-5 text-grey-500">{formatDate(tx.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
