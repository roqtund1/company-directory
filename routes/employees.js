const express = require('express');
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../controllers/employeeController');
const router = express.Router();

router.route('/')
    .get(getAllEmployees)
    .post(createEmployee);

router.route('/:id')
    .get(getEmployee)
    .patch(updateEmployee)
    .delete(deleteEmployee);


module.exports = router;