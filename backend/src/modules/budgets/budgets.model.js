import mongoose from "mongoose";

export const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    maximum: {
      type: Number,
      required: true,
    },
    spent: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      required: true,
    },
    latestTransactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        default: [],
      },
    ],
  },
  { timestamps: true },
);

budgetSchema.index({ userId: 1, category: 1 }, { unique: true });

export const budgetModel = mongoose.model("budget", budgetSchema);
