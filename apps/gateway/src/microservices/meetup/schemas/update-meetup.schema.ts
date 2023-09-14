import * as Joi from 'joi';

export const updateMeetupRequestSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  dateStart: Joi.date().iso(),
  dateEnd: Joi.date().iso(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  tags: Joi.array().items(Joi.string())
});
