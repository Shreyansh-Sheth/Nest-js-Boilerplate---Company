import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import {
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import type { Request } from 'express';
import { HasAccess } from 'src/auth/access.decorator';
import { Access } from 'src/auth/access.enum';
import { AccessGuard } from 'src/auth/access.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.onBoardNewUser(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: Request) {
    return req.user;
  }

  @HasAccess(Access.BUY)
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Get('cart')
  async cart(@Req() req: Request) {
    return req.user;
  }
}
