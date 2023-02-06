import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/utils/utils.module';
import { SingzyService } from './singzy.service';

@Module({
  imports: [
    UtilsModule,
    HttpModule.register({
      baseURL: 'https://api.singzy.com',
    }),
  ],
  providers: [SingzyService],
  exports: [SingzyService],
})
export class SingzyModule {}
