const Joi = require('joi');

function validateProduct(product){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().min(0).max(1000).required(),
        tags: Joi.array().required(),
        category: Joi.string().min(3).max(50).required(),
        type: Joi.string().min(3).max(50).required(),
    })

    return schema.validate(product);
}

module.exports = validateProduct;