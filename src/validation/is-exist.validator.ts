// src/validators/is-exists.validator.ts

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'IsExist', async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  // We need to inject the DataSource to get access to repositories
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const [entity] = args.constraints;
    if (!value || !entity) {
      return false;
    }

    try {
      const repository = this.dataSource.getRepository(entity);

      const record = await repository.findOne({ where: { id: value } });
      return record !== null; // Return true if the record exists
    } catch (e) {
      console.log('Record found:', e);
      return false; // Return false on error
    }
  }

  defaultMessage(args: ValidationArguments) {
    const [entity] = args.constraints;
    return `${entity.name} with ID ${args.value} does not exists.`;
  }
}

// This is the decorator function that you'll use in your DTOs
export function IsExist(
  entity: Function,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: IsExistConstraint,
    });
  };
}
