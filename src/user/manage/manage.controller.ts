import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ManageService } from './manage.service';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import { AccessGuard } from 'src/auth/access.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasAccess } from 'src/auth/access.decorator';
import { Access } from 'src/auth/access.enum';
import { Request } from 'express';
import { AuthUserRequest } from 'src/auth/auth-user-request.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Manage Users')
@Controller('manage')
export class ManageController {
  constructor(private readonly manageService: ManageService) {}

  @Post()
  @HasAccess(Access.USER_MANAGEMENT)
  @UseGuards(JwtAuthGuard, AccessGuard)
  create(@Body() createManageDto: CreateManageDto) {
    return this.manageService.create(createManageDto);
  }

  @Get()
  @HasAccess(Access.USER_MANAGEMENT)
  @UseGuards(JwtAuthGuard, AccessGuard)
  findAll(@Req() req: AuthUserRequest) {
    return this.manageService.findAll(req.user.companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthUserRequest) {
    return this.manageService.findOne(id, req.user.companyId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManageDto: UpdateManageDto,

    @Req() req: AuthUserRequest,
  ) {
    return this.manageService.update(id, req.user.companyId, updateManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthUserRequest) {
    return this.manageService.remove(id, req.user.companyId);
  }
}
