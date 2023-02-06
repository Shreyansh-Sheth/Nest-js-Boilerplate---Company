import { PartialType } from '@nestjs/swagger';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(Company) {
  _id: string;
}
