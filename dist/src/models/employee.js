"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const EmployeeSchema = new Schema({
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
        enum: ['Male', 'Female'],
    },
    cafe: {
        type: Schema.Types.ObjectId,
        ref: "Cafe",
    }
}, {
    timestamps: true,
    collection: "employees",
});
exports.default = mongoose_1.default.models.Employee ||
    mongoose_1.default.model("Employee", EmployeeSchema);
