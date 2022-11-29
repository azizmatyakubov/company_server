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
        }),
    },
};

export default authValidator;