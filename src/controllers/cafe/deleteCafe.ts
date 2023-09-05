import { Request, Response } from "express";
import Cafe from "../../models/cafe";
import Employee from "../../models/employee";

async function deleteCafe(req: Request, res: Response) {
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
}

export default deleteCafe;
