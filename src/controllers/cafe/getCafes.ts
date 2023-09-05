import { Request, Response } from "express";
import Cafe from "../../models/cafe";

async function getCafes(req: Request, res: Response) {
    let filter = req.query.location ? { location: req.query.location } : {};

    let cafes = await Cafe.find(filter)
      .lean()
      .sort({ numEmployees: -1 })
      .exec();

    return res.status(200).json(
      cafes.map((cafe) => {
        return {
          ...cafe,
          employees: cafe.numEmployees,
        };
      })
    );
}

export default getCafes;
