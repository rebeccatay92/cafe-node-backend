import express from "express";
const cafeRouter = express.Router();

import {
  getCafes,
  getSingleCafe,
  createCafe,
  updateCafe,
  deleteCafe,
} from "../controllers/cafe";

cafeRouter.get("/", getCafes);

cafeRouter.post("/", createCafe);

cafeRouter.get("/:id", getSingleCafe);

cafeRouter.put("/:id", updateCafe);

cafeRouter.delete("/:id", deleteCafe);

export default cafeRouter;
