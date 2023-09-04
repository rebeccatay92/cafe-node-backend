"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const defaultDB = "cafemongodb";
const connectToMongoDB = (dbName = defaultDB) => __awaiter(void 0, void 0, void 0, function* () {
    const dbURI = `mongodb://localhost:27017/${dbName}`;
    yield mongoose_1.default.connect(dbURI, {
        dbName,
    });
    return mongoose_1.default.connection;
});
exports.connectToMongoDB = connectToMongoDB;
const db = mongoose_1.default.connection;
db.on("connected", () => {
    console.log("MongoDB connected");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("open", () => {
    console.log("MongoDB connection successful");
});
