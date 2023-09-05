import { Request, Response } from "express";
import Employee from "../../models/employee";
import { ICafe } from "../../models/cafe";
import dayjs from "dayjs";

async function getEmployees(req: Request, res: Response) {
  let filter = req.query.cafe ? { cafe: req.query.cafe } : {};
  let employees = await Employee.find(filter)
    .lean()
    .populate<{ cafe: ICafe }>({
      path: "cafe",
      select: {
        name: 1,
      },
    })
    .exec();

  let data = employees.map((employee) => {
    let startDate = dayjs(employee.createdAt);
    let currentDate = dayjs();
    let difference = currentDate.diff(startDate, "day");
    return {
      ...employee,
      days_worked: difference,
      cafe: employee?.cafe?.name,
    };
  });
  return res.status(200).json(data);
}

export default getEmployees;
