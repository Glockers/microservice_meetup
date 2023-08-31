import * as Joi from 'joi';

export const registrationRequestSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  avatar: Joi.string().required()
});
