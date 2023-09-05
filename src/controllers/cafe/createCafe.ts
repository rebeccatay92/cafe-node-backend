import { Request, Response } from "express";
import Cafe from "../../models/cafe";

async function createCafe(req: Request, res: Response) {
    let { name, description, location } = req.body;
    try {
      let cafe = await Cafe.create({
        name,
        description,
        location,
      });
      return res.status(201).json(cafe);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error });
    }
}

export default createCafe
