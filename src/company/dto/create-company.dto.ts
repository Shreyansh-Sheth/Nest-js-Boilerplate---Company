import {
  MinLength,
  IsString,
  Length,
  IsEmail,
  Validate,
} from 'class-validator';
import { CompanyEmail } from 'src/user/email.validator';
export class CreateCompanyDto {
  @MinLength(1)
  @IsString()
  name: string;

  @Length(4, 4)
  otp: string;

  @IsEmail()
  @Validate(CompanyEmail)
  email: string;

  @IsString()
  @Length(10, 10)
  phoneNumber: string;
}
