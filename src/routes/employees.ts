import express from "express";
const employeeRouter = express.Router();

// ?cafe=cafe
employeeRouter.get('/', (req, res) => {
  return res.status(200).json({ hello: 'world' })
})

employeeRouter.post("/", (req, res) => {
  return res.status(201).json({ hello: "world" });
});

employeeRouter.put("/", (req, res) => {
  return res.status(200).json({ hello: "world" });
});

employeeRouter.delete("/", (req, res) => {
  return res.status(200).json({ hello: "world" });
});

export default employeeRouter
