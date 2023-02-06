import { PartialType } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { CreateManageDto } from './create-manage.dto';

export class UpdateManageDto extends PartialType(User) {}
