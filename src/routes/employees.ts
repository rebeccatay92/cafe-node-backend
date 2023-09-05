import express from "express";
const employeeRouter = express.Router();
import {
  getSingleEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployees,
} from "../controllers/employee";

employeeRouter.get("/", getEmployees);

employeeRouter.post("/", createEmployee);

employeeRouter.get("/:id", getSingleEmployee);

employeeRouter.put("/:id", updateEmployee);

employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;
