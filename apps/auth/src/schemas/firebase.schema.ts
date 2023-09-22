import * as Joi from 'joi';

export const configValidationSchemaFirebase = Joi.object({
  FIREBASE_API_KEY: Joi.string().required(),
  FIREBASE_AUTH_DOMAIN: Joi.string().required(),
  FIREBASE_PROJECT_ID: Joi.string().required(),
  FIREBASE_STORAGE_BUCKET: Joi.string().required(),
  FIREBASE_MESSAGING_SENDER_ID: Joi.string().required(),
  FIREBASE_API_ID: Joi.string().required(),
  FIREBASE_MEASUREMENT_ID: Joi.string().required()
});
