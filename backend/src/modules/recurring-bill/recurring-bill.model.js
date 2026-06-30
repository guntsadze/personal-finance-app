import mongoose from "mongoose";

export const recurringBillSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    dueDayOfMonth: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
    },
    status: {
      type: String,
      enum: ["paid", "upcoming", "due-soon"],
      default: "upcoming",
    },
  },
  { timestamps: true },
);

export const recurringBillModel = mongoose.model(
  "recurringBill",
  recurringBillSchema,
);
