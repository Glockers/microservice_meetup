import * as Joi from 'joi';

import { configValidationSchemaRMQ } from './rmq.config';
import { configValidationSchemaDatabase } from './database.schema';
import { configValidationSchemaES } from './es.schema';

export const mergedConfigValidationSchema = Joi.object()
  .concat(configValidationSchemaRMQ)
  .concat(configValidationSchemaDatabase)
  .concat(configValidationSchemaES);
