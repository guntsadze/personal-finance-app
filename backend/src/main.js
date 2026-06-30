import express from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.controller.js";
import { env } from "./config/env.js";
import connectDB from "./config/db.config.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
// app.use("/overview", overviewRoutes);
// app.use("/transactions", transactionsRoutes);
// app.use("/budgets", budgetsRoutes);
// app.use("/pots", potsRoutes);
// app.use("/recurring-bills", recurringBillsRoutes);

// app.use(notFound);
// app.use(errorHandler);

connectDB()
  .then(() =>
    app.listen(env.PORT, () =>
      console.log(`Server is running on http://localhost:${env.PORT}`),
    ),
  )
  .catch((err) => console.log(err));
