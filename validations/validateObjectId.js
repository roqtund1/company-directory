const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


function validateObjectId(id){
    const schema = Joi.object({
        id: Joi.objectId(),
    })

    return schema.validate(id);
    
}

module.exports = validateObjectId