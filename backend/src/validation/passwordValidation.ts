import Joi from "joi";

const passwordSchema = Joi.object({
  password: Joi.string()
    .min(10)
    .pattern(/[a-z]/)
    .pattern(/[A-Z]/)
    .pattern(/[0-9]/)
    // Special characters
    .pattern(/[^a-zA-Z0-9]/)
    .required(),
  confirmPassword: Joi.string().required(),
}).custom((data, helpers) => {
  if (data.password !== data.confirmPassword) {
    return helpers.error("any.invalid", { message: "Passwords do not match" });
  }
  return data;
});

export const validatePassword = (data: {
  password: string;
  confirmPassword: string;
}) => {
  return passwordSchema.validate(data, { abortEarly: false });
};
