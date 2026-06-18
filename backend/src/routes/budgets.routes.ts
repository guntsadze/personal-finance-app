import { Router } from "express";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgets.controller";

export const budgetsRoutes = Router();

budgetsRoutes.get("/", getBudgets);
budgetsRoutes.post("/", createBudget);
budgetsRoutes.put("/:id", updateBudget);
budgetsRoutes.delete("/:id", deleteBudget);
