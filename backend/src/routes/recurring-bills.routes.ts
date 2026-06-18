import { Router } from "express";
import { getRecurringBills } from "../controllers/recurring-bills.controller";

export const recurringBillsRoutes = Router();

recurringBillsRoutes.get("/", getRecurringBills);
