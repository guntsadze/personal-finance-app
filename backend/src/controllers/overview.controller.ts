import type { Request, Response } from "express";

export async function getOverview(_req: Request, res: Response) {
  res.json({
    currentBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    pots: [],
    budgets: [],
    recentTransactions: [],
    recurringBills: [],
  });
}
