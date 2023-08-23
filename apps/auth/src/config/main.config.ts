import * as Joi from 'joi';

import { configValidationSchemaRMQ } from './rmq.config';

export const mergedConfigValidationSchema = Joi.object().concat(
  configValidationSchemaRMQ
);
