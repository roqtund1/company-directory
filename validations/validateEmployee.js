const Joi = require('joi');

const validateEmployee = (employee) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        age: Joi.number().min(14).max(50).required(),
        education: Joi.string().min(3).max(100).required(),
        yearsOfExperience: Joi.number().min(1).max(50).required(),
        profile: Joi.string().min(3).max(100).required(),
        department: Joi.string().min(3).max(100).required(),
        salary: Joi.number().min(0).max(5000000).required(),
    })

    return schema.validate(employee);
}

module.exports = validateEmployee;