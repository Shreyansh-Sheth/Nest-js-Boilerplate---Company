import { Body, Controller, Post, Res } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CompanyService } from 'src/company/company.service';
import { UserService } from 'src/user/user.service';
import { Access } from './access.enum';
import { AuthService } from './auth.service';
import { LoginCredDto } from './dto/login-cred.dto';
import { LoginOtpDto } from './dto/login-otp.dto';
import tokenConst from './token.const';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @Post('login/otp')
  async loginOtp(@Body() loginOtpDto: LoginOtpDto, @Res() res: Response) {
    //TODO get user and check its auth
    const companyData = await this.companyService.getCompanyByEmail(
      loginOtpDto.email,
    );

    if (companyData.isOtpVerified) {
      throw new UnauthorizedException('Already Verified');
    }

    if (companyData.otp !== loginOtpDto.otp) {
      throw new UnauthorizedException('Invalid Otp');
    }
    this.companyService.updateCompany({
      _id: companyData._id,
      isOtpVerified: true,
    });

    const user = await this.userService.findUserByEmail(loginOtpDto.email);
    const token = this.authService.getJwtToken({
      sub: user._id.toString(),
      companyId: user.company.toString(),
      role: user.role,
      access: [],
    });

    res.cookie(tokenConst.TOKEN_NAME, token, {
      httpOnly: true,
    });
    return res.send({ success: true });
  }

  @Post('login/credentials')
  async loginCred(@Body() LoginCredDto: LoginCredDto, @Res() res: Response) {
    const user = await this.userService.findUserByEmail(LoginCredDto.email);
    if (user.password !== LoginCredDto.password) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = this.authService.getJwtToken({
      sub: user._id.toString(),
      role: user.role,
      companyId: user.company.toString(),
      access: [Access.ADD_TO_CART],
    });
    res.cookie(tokenConst.TOKEN_NAME, token, {
      httpOnly: true,
    });
    return res.send({ success: true });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie(tokenConst.TOKEN_NAME, {
      httpOnly: true,
    });
    return res.send({ success: true });
  }
}
