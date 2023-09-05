import express, { Request, Response } from "express";
import Cafe from "../models/cafe";
const cafeRouter = express.Router();

// ?location=location
cafeRouter.get("/", async (req: Request, res: Response) => {
  let cafes = await Cafe.find({}).exec();
  console.log(cafes);
  return res.status(200).json(cafes);
});

cafeRouter.post("/", (req, res) => {
  return res.status(201).json({ hello: "world" });
});

cafeRouter.put("/:id", (req, res) => {
  return res.status(200).json({ hello: "world" });
});

cafeRouter.delete("/:id", (req, res) => {
  return res.status(200).json({ hello: "world" });
});

export default cafeRouter;
