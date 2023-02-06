import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class CompanyEmail implements ValidatorConstraintInterface {
  email = ['gmail.com', 'yahoo.com', 'hotmail.com'];
  async validate(value: string) {
    return !this.email.includes(value.split('@')[1]);
  }

  defaultMessage(args: ValidationArguments) {
    return `Not A Valid Company Email`;
  }
}
