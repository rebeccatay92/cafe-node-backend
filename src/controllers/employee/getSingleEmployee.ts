import { Request, Response } from "express";
import Employee from "../../models/employee";

async function getSingleEmployee(req: Request, res: Response) {
  let employee = await Employee.findById(req.params.id).lean();
  return res.status(200).json(employee);
}

export default getSingleEmployee;
