import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: ObjectSchema) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return value;
  }
}
