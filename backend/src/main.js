import express from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.controller.js";
import { env } from "./config/env.js";
import connectDB from "./config/db.config.js";
import { potsRouter } from "./modules/pots/pots.routes.js";
import { budgetsRouter } from "./modules/budgets/budgtes.routes.js";
import { transactionsRouter } from "./modules/transactions/transactions.routes.js";
import { overviewRouter } from "./modules/overview/overview.routes.js";
import { recurringBillRouter } from "./modules/recurring-bill/recurring-bill.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/overview", overviewRouter);
app.use("/transactions", transactionsRouter);
app.use("/budgets", budgetsRouter);
app.use("/pots", potsRouter);
app.use("/recurring-bills", recurringBillRouter);

// app.use(notFound);
// app.use(errorHandler);

connectDB()
  .then(() =>
    app.listen(env.PORT, () =>
      console.log(`Server is running on http://localhost:${env.PORT}`),
    ),
  )
  .catch((err) => console.log(err));
