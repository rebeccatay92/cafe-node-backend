import { Request, Response } from "express";
import Counter from "../../models/counter";
import Employee from "../../models/employee";

async function createEmployee(req: Request, res: Response) {
  let { name, phone_number, email_address, gender } = req.body;
  try {
    let employeeIdCounter = await Counter.findOneAndUpdate(
      { name: "employee" },
      { $inc: { seqValue: 1 } },
      { new: true }
    );

    let employee = await Employee.create({
      id: `UI${employeeIdCounter?.seqValue}`,
      name,
      email_address,
      phone_number,
      gender,
    });
    return res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
}

export default createEmployee;
