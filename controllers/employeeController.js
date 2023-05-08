const Employee = require("../models/employee");
const validateEmployee = require("../validations/validateEmployee");
const validateObjectId = require("../validations/validateObjectId");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json({
    nbHits: employees.length,
    hits: employees,
  });
};

const getEmployee = async (req, res) => {
  const { id: userId } = req.params;

  // validate ID
  const { error } = validateObjectId({ id: userId });
  if (error) return res.status(400).send("Invalid ID!");

  const employee = await Employee.findById(userId);
  if (!employee) return res.status(404).send(`No employee with ID: ${userId}.`);

  res.json({ employee });
};

const createEmployee = async (req, res) => {
  const { body } = req;

  //validate employee
  const { error } = validateEmployee(body);
  if (error) return res.status(400).send(error.details[0].message);

  const employee = await Employee.create(body);
  res.status(201).json({ employee });
};

const updateEmployee = async (req, res) => {
  const { body } = req;
  const { id: userId } = req.params;

  // validate ID
  const { error: IdError } = validateObjectId({ id: userId });
  if (IdError) return res.status(400).send("Invalid ID!");

  //validate employee
  const { error } = validateEmployee(body);
  if (error) return res.status(400).send(error.details[0].message);

  const employee = await Employee.findByIdAndUpdate(
    userId,
    { ...body },
    { new: true }
  );
  if (!employee) return res.status(404).send(`No employee with ID: ${userId}.`);
  res.send(employee);
};

const deleteEmployee = async (req, res) => {
  const { id: userId } = req.params;

  // validate ID
  const { error } = validateObjectId({ id: userId });
  if (error) return res.status(400).send("Invalid ID!");

  const employee = await Employee.findByIdAndDelete(userId);
  if (!employee) return res.status(404).send(`No employee with ID: ${userId}.`);

  res.json({ employee });
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
