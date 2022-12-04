import Joi from "joi";

const usersValidator = {
    updateUser : {
        body: Joi.object({
            name: Joi.string().optional(),
            surname: Joi.string().optional(),
            email: Joi.string().email().optional(),
        }),
    },
};

export default usersValidator;