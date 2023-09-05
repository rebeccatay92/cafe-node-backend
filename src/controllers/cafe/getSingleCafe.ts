import { Request, Response } from "express";
import Cafe from "../../models/cafe";

async function getSingleCafe(req: Request, res: Response) {
  let cafe = await Cafe.findById(req.params.id)
    .lean()
    .select({ name: 1, location: 1, description: 1 })
    .exec();
  return res.status(200).json(cafe);
}

export default getSingleCafe;
