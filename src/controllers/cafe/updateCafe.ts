import { Request, Response } from "express";
import Cafe from "../../models/cafe";

async function updateCafe(req: Request, res: Response) {
  let { name, description, location } = req.body;
  try {
    let cafe = await Cafe.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        location,
      },
      { new: true }
    );
    return res.status(200).json(cafe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
}

export default updateCafe;
