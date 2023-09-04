import { Schema, model } from "mongoose";

const CounterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seqValue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Counter", CounterSchema);
