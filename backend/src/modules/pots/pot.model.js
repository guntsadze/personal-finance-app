import mongoose from "mongoose";

export const potSchema = new mongoose.Schema(
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
    target: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const potModel = mongoose.model("pot", potSchema);
