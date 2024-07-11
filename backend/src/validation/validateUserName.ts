import Joi from "joi";

const userNameSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .pattern(/^[a-zA-Z0-9]*$/)
    .required(),
});

export const validateUserName = (data: { name: string }) => {
  return userNameSchema.validate(data);
};
