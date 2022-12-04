import Joi from "joi";

const departmentsValidator = {
    create: {
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
        }),
    },

    update: {
        body: Joi.object({
            name: Joi.string(),
            description: Joi.string(),
        }),
    }
    
}


export default departmentsValidator;