import { BaseService } from "../../common/services/base.service.js";
import { potModel } from "../pots/pot.model.js";
import { budgetModel } from "../budgets/budgets.model.js";
import { transactionModel } from "../transactions/transactions.model.js";
import { recurringBillModel } from "../recurring-bill/recurring-bill.model.js";

class OverviewService extends BaseService {
  constructor() {
    super(null);
  }

  getOverviewData = async (userId) => {
    const [pots, budgets, transactions, recurringBills] = await Promise.all([
      potModel.find({ userId }),
      budgetModel.find({ userId }),
      transactionModel.find({ userId }).sort({ date: -1 }),
      recurringBillModel.find({ userId }),
    ]);

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((t) => {
      if (t.amount > 0) {
        totalIncome += t.amount;
      } else {
        totalExpenses += Math.abs(t.amount);
      }
    });

    const currentBalance = totalExpenses - totalIncome;

    return {
      currentBalance,
      totalIncome,
      totalExpenses,
      pots: pots.map((p) => ({
        id: p._id,
        name: p.name,
        target: p.target,
        total: p.total,
        color: p.color,
      })),
      budgets: budgets.map((b) => ({
        id: b._id,
        category: b.category,
        maximum: b.maximum,
        spent: b.spent,
        color: b.color,
      })),
      recentTransactions: transactions.slice(0, 5),
      recurringBills: recurringBills || [],
    };
  };
}

export const overviewService = new OverviewService();
