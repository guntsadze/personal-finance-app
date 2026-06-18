import { Router } from "express";
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactions.controller";

export const transactionsRoutes = Router();

transactionsRoutes.get("/", getTransactions);
transactionsRoutes.post("/", createTransaction);
transactionsRoutes.get("/:id", getTransaction);
transactionsRoutes.put("/:id", updateTransaction);
transactionsRoutes.delete("/:id", deleteTransaction);
