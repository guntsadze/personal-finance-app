import type { Transaction } from "@/types/transaction";

export interface Budget {
  _id: string;
  category: string;
  maximum: number;
  spent: number;
  color: string;
  latestTransactions: Transaction[];
}
