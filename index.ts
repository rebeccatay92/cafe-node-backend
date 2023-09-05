import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { connectToMongoDB } from "./src/db";
import cafeRouter from "./src/routes/cafes";
import employeeRouter from "./src/routes/employees";

dotenv.config();

const app: Express = express();
const port = 3001;

app.use(bodyParser.json());
app.use(compression());
app.use(cors());

connectToMongoDB();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json({ hello: "world" });
});

app.use("/cafes", cafeRouter);

app.use("/employees", employeeRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
