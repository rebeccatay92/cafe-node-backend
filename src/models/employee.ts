import { Schema, Types, model, Document } from "mongoose";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

export interface IEmployee {
  id: string,
  name: string;
  email_address: string;
  phone_number: string;
  gender: string;
  cafe: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    // of format ‘UIXXXXXXX’
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minLength: [6, "Name must be at least 6 characters long"],
      maxLength: [10, "Name must be at most 10 characters long"],
    },
    email_address: {
      type: String,
      required: true,
      match: [emailRegex, "Please enter a valid email address"],
    },
    phone_number: {
      type: String,
      required: true,
      minLength: [8, "Phone number must be 8 digits long"],
      maxLength: [8, "Phone number must be 8 digits long"],
      // phone num starts with an 8 or 9
      match: [/^[8-9]\d{7}$/, "Please enter a valid phone number"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    cafe: {
      type: Schema.Types.ObjectId,
      ref: "Cafe",
    },
  },
  {
    timestamps: true,
    collection: "employees",
  }
);

export default model<IEmployee>("Employee", EmployeeSchema);
