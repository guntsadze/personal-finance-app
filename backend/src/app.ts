import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";
import { overviewRoutes } from "./routes/overview.routes";
import { transactionsRoutes } from "./routes/transactions.routes";
import { budgetsRoutes } from "./routes/budgets.routes";
import { potsRoutes } from "./routes/pots.routes";
import { recurringBillsRoutes } from "./routes/recurring-bills.routes";
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/overview", overviewRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/budgets", budgetsRoutes);
app.use("/api/pots", potsRoutes);
app.use("/api/recurring-bills", recurringBillsRoutes);

app.use(notFound);
app.use(errorHandler);
