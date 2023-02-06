import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginCredDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
