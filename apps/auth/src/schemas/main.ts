import * as Joi from 'joi';

import { configValidationSchemaRMQ } from './rmq.schema';
import { configValidationSchemaDatabase } from './database.schema';
import { configValidationSchemaJWT } from './jwt.schema';

export const mergedConfigValidationSchema = Joi.object()
  .concat(configValidationSchemaRMQ)
  .concat(configValidationSchemaDatabase)
  .concat(configValidationSchemaJWT);
