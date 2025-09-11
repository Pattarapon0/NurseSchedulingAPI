import {ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint } from 'class-validator';


@ValidatorConstraint({ name: 'notInPast', async: false })
export class NotInPastConstraint implements ValidatorConstraintInterface {
  validate(date: Date) {
    return date >= new Date();
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not be in the past`;
  }
}