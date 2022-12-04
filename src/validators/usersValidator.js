import Joi from "joi";

const usersValidator = {
    updateUser : {
        body: Joi.object({
            name: Joi.string().optional(),
            surname: Joi.string().optional(),
            email: Joi.string().email().optional(),
        }),
    },
    updateUserRole : {
        body: Joi.object({
            role: Joi.string().required(),
        }),
    },
    changeDepartment : {
        body: Joi.object({
            department: Joi.string().required(),
        }),
    },
};

export default usersValidator;