import * as Joi from 'joi';

export const createMeetupRequestSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dateStart: Joi.date().iso().required(),
  dateEnd: Joi.date().iso().required(),
  lat: Joi.number().required(),
  long: Joi.number().required(),
  tags: Joi.array().items(Joi.string()).required()
});
