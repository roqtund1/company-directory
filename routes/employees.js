const express = require('express');
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../controllers/employeeController');
const router = express.Router();

router.route('/employees')
    .get(getAllEmployees)
    .post(createEmployee);

router.route('/employees/:id')
    .get(getEmployee)
    .patch(updateEmployee)
    .delete(deleteEmployee);


module.exports = router;