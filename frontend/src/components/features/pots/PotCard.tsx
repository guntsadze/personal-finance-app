import { ColorDot } from "@/components/ui/ColorDot";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { CardOptionsMenu } from "@/components/ui/CardOptionsMenu";
import { formatCurrency } from "@/lib/format-currency";
import type { Pot } from "@/types/pot";

interface PotCardProps {
  pot: Pot;
  onEdit: () => void;
  onDelete: () => void;
  onAddMoney: () => void;
  onWithdraw: () => void;
}

export function PotCard({ pot, onEdit, onDelete, onAddMoney, onWithdraw }: PotCardProps) {
  const percentage = pot.target > 0 ? (pot.total / pot.target) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl p-300 flex flex-col gap-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-200">
          <ColorDot color={pot.color} size="md" />
          <span className="text-preset-2 text-grey-900">{pot.name}</span>
        </div>
        <CardOptionsMenu onEdit={onEdit} onDelete={onDelete} />
      </div>

      <div className="flex flex-col gap-100">
        <span className="text-preset-4 text-grey-500">Total Saved</span>
        <span className="text-preset-1 text-grey-900">{formatCurrency(pot.total)}</span>
      </div>

      <div className="flex flex-col gap-100">
        <ProgressBar color={pot.color} percentage={percentage} />
        <div className="flex items-center justify-between">
          <span className="text-preset-5-bold text-grey-500">{percentage.toFixed(1)}%</span>
          <span className="text-preset-5 text-grey-500">Target of {formatCurrency(pot.target)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-200">
        <Button variant="secondary" className="w-full justify-center" onClick={onAddMoney}>
          + Add Money
        </Button>
        <Button variant="secondary" className="w-full justify-center" onClick={onWithdraw}>
          Withdraw
        </Button>
      </div>
    </div>
  );
}
