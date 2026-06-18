import { DashboardCardHeader } from "@/components/ui/DashboardCardHeader";
import { formatCurrency } from "@/lib/format-currency";

interface BillGroup {
  count: number;
  total: number;
}

interface RecurringBillsSummaryCardProps {
  paid: BillGroup;
  upcoming: BillGroup;
  dueSoon: BillGroup;
  onSeeDetails?: () => void;
}

interface StatusRowProps {
  label: string;
  amount: number;
  accentColor: string;
}

function StatusRow({ label, amount, accentColor }: StatusRowProps) {
  return (
    <div
      className="flex items-center justify-between rounded-lg px-200 py-150 border-l-4"
      style={{
        borderLeftColor: `var(--color-${accentColor})`,
        backgroundColor: `color-mix(in srgb, var(--color-${accentColor}) 8%, white)`,
      }}
    >
      <span className="text-preset-4 text-grey-500">{label}</span>
      <span className="text-preset-4-bold text-grey-900">{formatCurrency(amount)}</span>
    </div>
  );
}

export function RecurringBillsSummaryCard({
  paid,
  upcoming,
  dueSoon,
  onSeeDetails,
}: RecurringBillsSummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl p-300 flex flex-col gap-300">
      <DashboardCardHeader
        title="Recurring Bills"
        linkLabel="See Details"
        onLinkClick={onSeeDetails}
      />

      <div className="flex flex-col gap-200">
        <StatusRow label="Paid Bills" amount={paid.total} accentColor="green" />
        <StatusRow label="Total Upcoming" amount={upcoming.total} accentColor="gold" />
        <StatusRow label="Due Soon" amount={dueSoon.total} accentColor="red" />
      </div>
    </div>
  );
}
