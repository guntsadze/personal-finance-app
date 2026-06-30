"use client";

import { useRouter } from "next/navigation";
import { useOverview } from "@/hooks/use-overview";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { PageHeader } from "@/components/ui/PageHeader";
import { SummaryStatCard } from "@/components/features/overview/SummaryStatCard";
import { PotsSummaryCard } from "@/components/features/overview/PotsSummaryCard";
import { BudgetsSummaryCard } from "@/components/features/overview/BudgetsSummaryCard";
import { TransactionsSummaryCard } from "@/components/features/overview/TransactionsSummaryCard";
import { RecurringBillsSummaryCard } from "@/components/features/overview/RecurringBillsSummaryCard";
import type { RecurringBill } from "@/types/recurring-bill";

function groupBills(bills: RecurringBill[], status: RecurringBill["status"]) {
  const matching = bills.filter((b) => b.status === status);
  return {
    count: matching.length,
    total: matching.reduce((s, b) => s + b.amount, 0),
  };
}

export default function OverviewPage() {
  const { data, loading, error, refetch } = useOverview();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex flex-col gap-300">
        <Skeleton className="h-[40px] w-[180px]" />
        <div className="flex gap-300">
          <Skeleton className="h-[120px] flex-1" />
          <Skeleton className="h-[120px] flex-1" />
          <Skeleton className="h-[120px] flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-300">
          <Skeleton className="h-[240px]" />
          <Skeleton className="h-[240px]" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Couldn't load overview data." onRetry={refetch} />
    );
  }

  if (!data) return null;

  const paid = groupBills(data.recurringBills, "paid");
  const upcoming = groupBills(data.recurringBills, "upcoming");
  const dueSoon = groupBills(data.recurringBills, "due-soon");

  return (
    <div className="flex flex-col gap-300">
      <PageHeader title="Overview" />

      {/* Summary stats */}
      <div className="flex flex-col sm:flex-row gap-200">
        <SummaryStatCard
          label="Current Balance"
          amount={data.currentBalance}
          variant="hero"
        />
        <SummaryStatCard label="Income" amount={data.totalIncome} />
        <SummaryStatCard label="Expenses" amount={data.totalExpenses} />
      </div>

      {/* Pots + Budgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-300">
        <PotsSummaryCard
          pots={data.pots}
          onSeeDetails={() => router.push("/pots")}
        />
        <BudgetsSummaryCard
          budgets={data.budgets}
          onSeeDetails={() => router.push("/budgets")}
        />
      </div>

      {/* Transactions + Recurring Bills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-300">
        <TransactionsSummaryCard
          transactions={data.recentTransactions}
          onViewAll={() => router.push("/transactions")}
        />
        <RecurringBillsSummaryCard
          paid={paid}
          upcoming={upcoming}
          dueSoon={dueSoon}
          onSeeDetails={() => router.push("/recurring-bills")}
        />
      </div>
    </div>
  );
}
