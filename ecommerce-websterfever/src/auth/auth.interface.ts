import { Role } from '../users/roles.enum';

export interface JwtPayload {
  Id: string;
  email: string;
  iat?: Date;
  exp?: Date;
  roles?: Role[];
}
