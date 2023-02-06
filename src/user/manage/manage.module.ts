import { Module } from '@nestjs/common';
import { ManageService } from './manage.service';
import { ManageController } from './manage.controller';
import { User, UserSchema } from '../entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UtilsModule,
  ],
  controllers: [ManageController],
  providers: [ManageService],
})
export class ManageModule {}
