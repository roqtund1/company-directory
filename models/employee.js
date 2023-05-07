const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define schema for Employee model
const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  age: {
    type: Number,
    required: true,
    min: 14,
    max: 50,
  },
  education: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    default: 1,
  },
  profile: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    default: 500,
  },
});

// Create Employee model from schema
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
