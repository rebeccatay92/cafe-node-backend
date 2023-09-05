import { Schema, Types, model, Document } from "mongoose";

export interface ICafe extends Document {
  name: string;
  description: string;
  location: string;
  employees: Types.ObjectId[];
}

const CafeSchema = new Schema<ICafe>(
  {
    name: {
      type: String,
      required: true,
      minLength: [6, "Name must be at least 6 characters long"],
      maxLength: [10, "Name must be at most 10 characters long"],
    },
    description: {
      type: String,
      required: true,
      maxLength: [256, "Description must be at most 256 characters long"],
    },
    location: {
      type: String,
      required: true,
      minLength: [2, "Location must be a 2-letter country code"],
      maxLength: [2, "Location must be a 2-letter country code"],
    },
    employees: {
      type: [Schema.Types.ObjectId],
      ref: "Employee",
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "cafes",
  }
);

export default model<ICafe>("Cafe", CafeSchema);
