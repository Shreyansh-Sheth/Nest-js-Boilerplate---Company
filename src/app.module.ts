import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { SingzyService } from './singzy/singzy.service';
import { SingzyModule } from './singzy/singzy.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bxi'),
    UserModule,
    CompanyModule,
    MailModule,
    UtilsModule,
    AuthModule,
    SingzyModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
