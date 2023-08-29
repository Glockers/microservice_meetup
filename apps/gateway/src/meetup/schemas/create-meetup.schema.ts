import * as Joi from 'joi';

export const createMeetupRequestSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dateStart: Joi.date().iso().required(),
  dateEnd: Joi.date().iso().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
});
