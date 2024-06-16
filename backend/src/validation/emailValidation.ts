import Joi from "joi";

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const validateEmail = (data: { email: string }) => {
  return emailSchema.validate(data);
};
