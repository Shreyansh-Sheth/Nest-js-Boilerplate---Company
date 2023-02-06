import {
  IsEmail,
  MinLength,
  Validate,
  IsString,
  Length,
  IsStrongPassword,
} from 'class-validator';
import { CompanyEmail } from '../email.validator';

export class CreateUserDto {
  @IsEmail()
  @Validate(CompanyEmail)
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  @MinLength(1)
  companyName: string;

  @IsString()
  @Length(10, 10)
  phoneNumber: string;
}
