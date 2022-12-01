import Joi from "joi";

const authValidator = {
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    },
    register: {
        body: Joi.object({
            name: Joi.string().required(),
            surname: Joi.string().optional(),
            email: Joi.string().email().required(),
            password: Joi.string().optional(),
            role: Joi.string().valid('user', 'admin', 'superadmin').optional(),
            position: Joi.string().optional(),
            department: Joi.string().optional(),
        }),
    },
};

export default authValidator;