import { IsEmail, IsString } from 'class-validator';

export class LoginOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}
