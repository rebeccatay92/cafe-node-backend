import { connectToMongoDB } from "./index";
import Cafe from "../models/cafe";
import Counter from "../models/counter";
import Employee from "../models/employee";
import { faker } from "@faker-js/faker";

let seedCafeCountryCodes = ["SG", "US"];

type SeedCafe = {
  name: string;
  description: string;
  location: string;
};
type SeedEmployee = {
  name: string;
  email_address: string;
  phone_number: string;
  gender: string;
  cafe: string;
};

const clearExistingCollections = async () => {
  await Counter.deleteMany({});
  await Cafe.deleteMany({});
  await Employee.deleteMany({});
};

const seedCounter = async () => {
  await Counter.create({ name: "employee", seqValue: 1000000 });
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

  let employees: SeedEmployee[] = [];

  cafes.forEach((cafe) => {
    // create between 1 to 5 employees for each cafe
    let numEmployees = Math.floor(Math.random() * 5) + 1;
    for (let i = 1; i <= numEmployees; i++) {
      let phoneNumber = Math.floor(Math.random() * 10000000) + 80000000;
      let gender = Math.floor(Math.random() * 2) ? "Male" : "Female";
      let employee = {
        name: `EName${i}`,
        email_address: faker.internet.email(),
        phone_number: phoneNumber.toString(),
        gender,
        cafe: cafe.id,
      };
      employees.push(employee);
    }
  });

  await Promise.all(employees.map(async (employee) => {
    let employeeIdCounter = await Counter.findOneAndUpdate(
      { name: "employee" },
      { $inc: { seqValue: 1 } },
      { new: true }
    );
    if (!employeeIdCounter) throw new Error("Employee ID counter not found")

    let employeeId = `UI${employeeIdCounter.seqValue}`;
    let createdEmployee = await Employee.create({ ...employee, id: employeeId });
    return Cafe.findByIdAndUpdate(employee.cafe, {
      $push: { employees: createdEmployee._id },
    })
  }))
};

async function start() {
  try {
    await connectToMongoDB();
    await clearExistingCollections();
    await seedCounter();
    await seedCafes();
    await seedEmployees();
    console.info("Seeding completed, you can kill process now");
  } catch (error) {
    console.error(error);
  }
}

start().catch((error) => console.error(error));
