import { Request, Response } from "express";
import Cafe from "../../models/cafe";
import Employee from "../../models/employee";

async function deleteEmployee(req: Request, res: Response) {
  try {
    let deleteEmployeePromise = Employee.findByIdAndDelete(
      req.params.id
    ).exec();
    let removeFromCafePromise = Cafe.updateOne(
      {
        employees: req.params.id,
      },
      { $pull: { employees: req.params.id } }
    );
    await Promise.all([deleteEmployeePromise, removeFromCafePromise]);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}

export default deleteEmployee;
