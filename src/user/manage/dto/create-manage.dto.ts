import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateManageDto {
  @IsEmail()
  email: string;

  @IsString()
  companyId: string;

  @IsArray()
  @IsString({ each: true })
  access: string[];
}
