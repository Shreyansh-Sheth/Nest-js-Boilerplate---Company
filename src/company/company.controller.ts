import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/access.guard';
import { AuthUserRequest } from 'src/auth/auth-user-request.type';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @UseInterceptors(MongooseClassSerializerInterceptor(Company))
  @ApiOkResponse({ type: Company })
  @UseGuards(JwtAuthGuard, AccessGuard)
  getMyCompany(@Req() req: AuthUserRequest) {
    return this.companyService.getCompanyById(req.user.companyId);
  }

  @Get('list-company')
  @UseGuards(JwtAuthGuard, AccessGuard)
  getListOfCompanies() {}
}
