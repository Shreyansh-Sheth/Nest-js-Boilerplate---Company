import { SetMetadata } from '@nestjs/common';
import { Access } from './access.enum';

export const HasAccess = (...access: Access[]) => SetMetadata('access', access);
