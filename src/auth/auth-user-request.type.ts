import { Request } from 'express';
import { TokenPayload } from './TokenPayload.type';

export type AuthUserRequest = { user: TokenPayload } & Request;
