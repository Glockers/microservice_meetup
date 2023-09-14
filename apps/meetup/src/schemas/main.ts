import * as Joi from 'joi';

import { configValidationSchemaRMQ } from './rmq.config';
import { configValidationSchemaDatabase } from './database.schema';

export const mergedConfigValidationSchema = Joi.object()
  .concat(configValidationSchemaRMQ)
  .concat(configValidationSchemaDatabase);
