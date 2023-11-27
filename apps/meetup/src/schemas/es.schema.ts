import * as Joi from 'joi';

export const configValidationSchemaES = Joi.object({
  ELASTICSEARCH_USERNAME: Joi.string().required(),
  ELASTICSEARCH_PASSWORD: Joi.string().required(),
  ELASTICSEARCH_NODE: Joi.string().required(),
  ES_MEETUP_INDEX: Joi.string().required()
});
