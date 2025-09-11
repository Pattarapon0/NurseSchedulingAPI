import {ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint } from 'class-validator';


@ValidatorConstraint({ name: 'endAfterStart', async: false })
export class EndAfterStartConstraint implements ValidatorConstraintInterface {
  validate(endTime: Date, args: ValidationArguments) {
    const obj = args.object as {date: Date, startTime: Date, endTime: Date};
    return endTime > obj.startTime;
  }
  defaultMessage(args: ValidationArguments) {
    const obj = args.object as {date: Date, startTime: Date, endTime: Date};
    const endTimeFormatted = obj.endTime instanceof Date ? obj.endTime.toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }) : obj.endTime;
    const startTimeFormatted = obj.startTime instanceof Date ? obj.startTime.toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }) : obj.startTime;
    return `End time (${endTimeFormatted}) must be after start time (${startTimeFormatted})`;
  }
}   