import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './TokenPayload.type';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getJwtToken(data: TokenPayload) {
    return this.jwtService.sign(data);
  }
}
