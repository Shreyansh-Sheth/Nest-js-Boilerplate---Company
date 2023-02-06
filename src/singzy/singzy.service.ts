import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { UtilsService } from 'src/utils/utils.service';
import { SingzyAuthResponse } from './types/auth.type';

@Injectable()
export class SingzyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly utilsService: UtilsService,
  ) {}

  private username = 'BXI_prod';
  private password = 'rYBnIgGlBlaxFK6NiEpV';
  private async authApi() {
    const data = this.httpService.post<SingzyAuthResponse>('/patrons/login', {
      username: this.username,
      password: this.password,
    });

    return await lastValueFrom(data);
  }

  async getCompanyByName(name: string) {
    const auth = await this.authApi();
  }
}
