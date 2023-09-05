import express from "express";
const employeeRouter = express.Router();
import Cafe, { ICafe } from "../models/cafe";
import Employee from "../models/employee";
import dayjs from "dayjs";

// ?cafe=cafe
employeeRouter.get("/", async (req, res) => {
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
});

employeeRouter.post("/", (req, res) => {
  return res.status(201).json({ hello: "world" });
});

employeeRouter.put("/:id", (req, res) => {
  return res.status(200).json({ hello: "world" });
});

employeeRouter.delete("/:id", async (req, res) => {
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
});

export default employeeRouter;
