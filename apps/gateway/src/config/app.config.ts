import * as Joi from 'joi';

export const configValidationSchemaApp = Joi.object({
  PORT: Joi.number().required()
});
