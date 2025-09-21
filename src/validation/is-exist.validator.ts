// src/validators/is-exists.validator.ts

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';

// Define a type for an Entity constructor
type EntityConstructor = { new (...args: any[]): object; name: string }; // Changed to object

@ValidatorConstraint({ name: 'IsExist', async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: number, args: ValidationArguments) {
    const [entityClass] = args.constraints as [EntityConstructor];
    if (!value || !entityClass) {
      return false;
    }

    try {
      // Get the repository, explicitly typing it as Repository<object>
      const repository: Repository<object> = this.dataSource.getRepository(
        entityClass as EntityTarget<object>,
      );
      const record = await repository.findOne({ where: { id: value } });
      return record !== null;
    } catch (e) {
      console.log('Record found:', e);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const [entityClass] = args.constraints as [EntityConstructor];
    return `${entityClass.name} with ID ${args.value} does not exist.`;
  }
}

export function IsExist(
  entity: EntityConstructor,
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
