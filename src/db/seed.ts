import { connectToMongoDB } from "./index";
import Cafe from "../models/cafe";
import Employee from "../models/employee";
import { faker } from "@faker-js/faker";

let seedCafeCountryCodes = ["SG", "US"];

type SeedCafe = {
  name: string;
  description: string;
  location: string;
};

const clearExistingCollections = async () => {
  await Cafe.deleteMany({});
  await Employee.deleteMany({});
};

const seedCafes = async () => {
  let cafes: SeedCafe[] = [];
  seedCafeCountryCodes.forEach((countryCode, i) => {
    for (let j = 1; j <= 5; j++) {
      let n = i * 5 + j;
      cafes.push({
        name: `CafeName${n}`,
        description: faker.lorem.sentences(2),
        location: countryCode,
      });
    }
  });
  return Cafe.insertMany(cafes);
};

const seedEmployees = async () => {
  let cafes = await Cafe.find({});

  cafes.forEach(async (cafe) => {
    // create between 1 to 5 employees for each cafe
    let numEmployees = Math.floor(Math.random() * 5) + 1;
    for (let i = 1; i <= numEmployees; i++) {
      let phoneNumber = Math.floor(Math.random() * 10000000) + 80000000;
      let gender = Math.floor(Math.random() * 2) ? "Male" : "Female";
      let employee = await Employee.create({
        name: `EName${i}`,
        email_address: faker.internet.email(),
        phone_number: phoneNumber.toString(),
        gender,
        cafe: cafe._id,
      });

      await Cafe.findByIdAndUpdate(cafe._id, {
        $push: { employees: employee._id },
      });
    }
  });
};

async function start() {
  try {
    await connectToMongoDB();
    await clearExistingCollections();
    await seedCafes();
    await seedEmployees();
    console.info("Seeding completed, you can kill process now");
  } catch (error) {
    console.error(error);
  }
}

start().catch((error) => console.error(error));
