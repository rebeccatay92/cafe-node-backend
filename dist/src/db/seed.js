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
const index_1 = require("./index");
const cafe_1 = __importDefault(require("../models/cafe"));
const employee_1 = __importDefault(require("../models/employee"));
const faker_1 = require("@faker-js/faker");
let seedCafeCountryCodes = ["SG", "US"];
const clearExistingCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    yield cafe_1.default.deleteMany({});
    yield employee_1.default.deleteMany({});
});
const seedCafes = () => __awaiter(void 0, void 0, void 0, function* () {
    let cafes = [];
    seedCafeCountryCodes.forEach((countryCode, i) => {
        for (let j = 1; j <= 5; j++) {
            let n = i * 5 + j;
            cafes.push({
                name: `CafeName${n}`,
                description: faker_1.faker.lorem.sentences(2),
                location: countryCode,
            });
        }
    });
    return cafe_1.default.insertMany(cafes);
});
const seedEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    let cafes = yield cafe_1.default.find({});
    cafes.forEach((cafe) => __awaiter(void 0, void 0, void 0, function* () {
        // create between 1 to 5 employees for each cafe
        let numEmployees = Math.floor(Math.random() * 5) + 1;
        for (let i = 1; i <= numEmployees; i++) {
            let phoneNumber = Math.floor(Math.random() * 10000000) + 80000000;
            let gender = Math.floor(Math.random() * 2) ? "Male" : "Female";
            let employee = yield employee_1.default.create({
                name: `EName${i}`,
                email_address: faker_1.faker.internet.email(),
                phone_number: phoneNumber.toString(),
                gender,
                cafe: cafe._id,
            });
            yield cafe_1.default.findByIdAndUpdate(cafe._id, {
                $push: { employees: employee._id },
            });
        }
    }));
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, index_1.connectToMongoDB)();
            yield clearExistingCollections();
            yield seedCafes();
            yield seedEmployees();
            console.info("Seeding completed, you can kill process now");
        }
        catch (error) {
            console.error(error);
        }
    });
}
start().catch((error) => console.error(error));
