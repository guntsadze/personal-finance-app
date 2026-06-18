import { PiggyBank } from "lucide-react";
import { DashboardCardHeader } from "@/components/ui/DashboardCardHeader";
import { ColorDot } from "@/components/ui/ColorDot";
import { formatCurrency } from "@/lib/format-currency";
import type { Pot } from "@/types/pot";

interface PotsSummaryCardProps {
  pots: Pot[];
  onSeeDetails?: () => void;
}

export function PotsSummaryCard({ pots, onSeeDetails }: PotsSummaryCardProps) {
  const totalSaved = pots.reduce((sum, p) => sum + p.total, 0);
  const displayed = pots.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl p-300 flex flex-col gap-300">
      <DashboardCardHeader
        title="Pots"
        linkLabel="See Details"
        onLinkClick={onSeeDetails}
      />

      <div className="flex gap-300">
        {/* Total saved highlight */}
        <div className="flex flex-col items-center justify-center gap-150 bg-beige-100 rounded-xl p-250 flex-1">
          <PiggyBank size={32} className="text-green" />
          <span className="text-preset-5 text-grey-500">Total Saved</span>
          <span className="text-preset-1 text-grey-900">{formatCurrency(totalSaved)}</span>
        </div>

        {/* Mini grid (up to 4 pots) */}
        <div className="grid grid-cols-2 gap-x-200 gap-y-200 flex-1 content-start">
          {displayed.map((pot) => (
            <div key={pot.id} className="flex flex-col gap-50">
              <div className="flex items-center gap-100">
                <ColorDot color={pot.color} size="sm" />
                <span className="text-preset-5 text-grey-500 truncate">{pot.name}</span>
              </div>
              <span className="text-preset-4-bold text-grey-900">
                {formatCurrency(pot.total)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
