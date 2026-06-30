import mongoose from "mongoose";

export const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    avatarColor: {
      type: String,
      default: "#9333EA",
    },
    recurring: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const transactionModel = mongoose.model(
  "transaction",
  transactionSchema,
);
