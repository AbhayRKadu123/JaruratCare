const Joi = require('joi');
// servicename: String,
// description:String,
// price:Number
const JoiSchema = Joi.object({
    servicename: Joi.string()
        .min(3)
        .max(30)
        .required(),

    description: Joi.string()
        .min(1)
        .max(500)
        .required(),
    price: Joi.number()
        .integer()
        .min(1)
        .required()



})

module.exports=JoiSchema