"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { DashboardCardHeader } from "@/components/ui/DashboardCardHeader";
import { ColorDot } from "@/components/ui/ColorDot";
import { formatCurrency } from "@/lib/format-currency";
import type { Budget } from "@/types/budget";

interface BudgetsSummaryCardProps {
  budgets: Budget[];
  onSeeDetails?: () => void;
}

export function BudgetsSummaryCard({
  budgets,
  onSeeDetails,
}: BudgetsSummaryCardProps) {
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const totalLimit = budgets.reduce((s, b) => s + b.maximum, 0);

  const chartData = budgets.map((b) => ({
    name: b.category,
    value: Math.min(b.spent, b.maximum),
    color: b.color,
  }));

  return (
    <div className="bg-white rounded-2xl p-300 flex flex-col gap-300">
      <DashboardCardHeader
        title="Budgets"
        linkLabel="See Details"
        onLinkClick={onSeeDetails}
      />

      <div className="flex items-center gap-300">
        {/* Donut chart */}
        <div className="relative shrink-0 w-[200px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={68}
                outerRadius={88}
                dataKey="value"
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
              >
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={`var(--color-${entry.color})`}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-preset-1 text-grey-900">
              {formatCurrency(totalSpent)}
            </span>
            <span className="text-preset-5 text-grey-500">
              of {formatCurrency(totalLimit)} limit
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-200 flex-1 min-w-0">
          {budgets.map((b) => (
            <div
              key={b._id}
              className="flex items-center justify-between gap-100"
            >
              <div className="flex items-center gap-100 min-w-0">
                <ColorDot color={b.color} size="md" />
                <span className="text-preset-5 text-grey-500 truncate">
                  {b.category}
                </span>
              </div>
              <span className="text-preset-5-bold text-grey-900 shrink-0">
                {formatCurrency(b.spent)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
