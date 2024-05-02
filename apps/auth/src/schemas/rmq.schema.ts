import * as Joi from 'joi';

export const configValidationSchemaRMQ = Joi.object({
  RABBIT_MQ_URI: Joi.string().required(),
  RABBIT_MQ_AUTH_QUEUE: Joi.string().required()
});
