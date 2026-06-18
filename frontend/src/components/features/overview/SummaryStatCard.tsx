import { formatCurrency } from "@/lib/format-currency";

interface SummaryStatCardProps {
  label: string;
  amount: number;
  variant?: "hero" | "default";
}

export function SummaryStatCard({
  label,
  amount,
  variant = "default",
}: SummaryStatCardProps) {
  const isHero = variant === "hero";
  return (
    <div
      className={`flex flex-col gap-150 rounded-2xl p-300 flex-1 ${
        isHero ? "bg-grey-900" : "bg-white"
      }`}
    >
      <span
        className={`text-preset-4 ${isHero ? "text-white" : "text-grey-500"}`}
      >
        {label}
      </span>
      <span
        className={`text-preset-1 ${isHero ? "text-white" : "text-grey-900"}`}
      >
        {formatCurrency(amount)}
      </span>
    </div>
  );
}
