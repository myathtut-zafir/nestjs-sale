// src/validators/is-exists.validator.ts

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm'; // Import EntityTarget

// Define a type for an Entity constructor
type EntityConstructor = { new (...args: any[]): any; name: string };

@ValidatorConstraint({ name: 'IsExist', async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const [entity] = args.constraints as [EntityConstructor]; // Use EntityConstructor
    if (!value || !entity) {
      return false;
    }

    try {
      // TypeORM's getRepository expects EntityTarget<Entity>
      const repository = this.dataSource.getRepository(
        entity as EntityTarget<any>,
      );

      const record = await repository.findOne({ where: { id: value } });
      return record !== null; // Return true if the record exists
    } catch (e) {
      console.log('Record found:', e);
      return false; // Return false on error
    }
  }

  defaultMessage(args: ValidationArguments) {
    const [entity] = args.constraints as [EntityConstructor]; // Use EntityConstructor
    return `${entity.name} with ID ${args.value} does not exist.`;
  }
}

// This is the decorator function that you'll use in your DTOs
export function IsExist(
  entity: EntityConstructor, // Use EntityConstructor here as well
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
