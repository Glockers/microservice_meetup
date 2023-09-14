import * as Joi from 'joi';

export const configValidationSchemaRMQ = Joi.object({
  RABBIT_MQ_URI: Joi.string().required()
});
