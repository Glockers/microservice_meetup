import { configValidationSchemaApp } from './app.config';
import { configValidationSchemaRMQ } from './rmq.config';
import * as Joi from 'joi';

export const mergedConfigValidationSchema = Joi.object()
  .concat(configValidationSchemaApp)
  .concat(configValidationSchemaRMQ);
