import mongoose from "mongoose";

const defaultDB = "cafemongodb";

export const connectToMongoDB = async (dbName = defaultDB) => {
  const dbURI = `mongodb://localhost:27017/${dbName}`;
  await mongoose.connect(dbURI, {
    dbName,
  });

  return mongoose.connection;
};

const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB connected");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("open", () => {
  console.log("MongoDB connection successful");
});
