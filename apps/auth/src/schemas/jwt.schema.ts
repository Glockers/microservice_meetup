import * as Joi from 'joi';

export const configValidationSchemaJWT = Joi.object({
  SECRET_JWT_ACCESS: Joi.string().required(),
  SECRET_JWT_REFRESH: Joi.string().required()
});
