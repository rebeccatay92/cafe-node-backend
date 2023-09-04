"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CafeSchema = new mongoose_1.Schema({
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
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Employee",
        required: true,
        default: [],
    },
}, {
    timestamps: true,
    collection: "cafes",
});
exports.default = (0, mongoose_1.model)("Cafe", CafeSchema);
