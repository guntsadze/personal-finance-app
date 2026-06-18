import type { Transaction } from "@/types/transaction";
import type { Budget } from "@/types/budget";
import type { Pot } from "@/types/pot";
import type { RecurringBill } from "@/types/recurring-bill";

export interface OverviewSummary {
  currentBalance: number;
  totalIncome: number;
  totalExpenses: number;
  pots: Pot[];
  budgets: Budget[];
  recentTransactions: Transaction[];
  recurringBills: RecurringBill[];
}
