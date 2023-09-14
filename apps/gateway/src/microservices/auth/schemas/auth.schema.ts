import * as Joi from 'joi';

export const authRequestSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
});
