import { Request, Response } from "express";
import Employee from "../../models/employee";

async function updateEmployee(req: Request, res: Response) {
  let { name, phone_number, email_address, gender } = req.body;
  try {
    let employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phone_number,
        email_address,
        gender,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
}

export default updateEmployee;
