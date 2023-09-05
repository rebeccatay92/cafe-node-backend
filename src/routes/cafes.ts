import express, { Request, Response } from "express";
import Cafe from "../models/cafe";
import Employee from "../models/employee";
const cafeRouter = express.Router();

// ?location=location
cafeRouter.get("/", async (req: Request, res: Response) => {
  let filter = req.query.location ? { location: req.query.location } : {};

  let cafes = await Cafe.find(filter).lean().sort({ numEmployees: -1 }).exec();

  return res.status(200).json(
    cafes.map((cafe) => {
      return {
        ...cafe,
        employees: cafe.numEmployees,
      };
    })
  );
});

cafeRouter.post("/", async (req, res) => {
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
});

cafeRouter.put("/:id", async (req, res) => {
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
});

cafeRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    let deleteCafePromise = Cafe.findByIdAndDelete(req.params.id).exec();
    let deleteEmployeesPromise = Employee.deleteMany({
      cafe: req.params.id,
    }).exec();
    await Promise.all([deleteCafePromise, deleteEmployeesPromise]);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});

export default cafeRouter;
