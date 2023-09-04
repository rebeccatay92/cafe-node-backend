import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { connectToMongoDB } from "./src/db";

dotenv.config();

const app: Express = express();
const port = 3001;

app.use(bodyParser.json());
app.use(compression());
app.use(cors());

connectToMongoDB()

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
