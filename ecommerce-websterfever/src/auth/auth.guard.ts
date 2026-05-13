import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtPayload } from './auth.interface';
import { Role } from '../users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // ? llega por headers el token
    const token = request.headers.authorization?.split(' ')[1];

    // * ['Bearer', 'xxxxx']

    if (!token) throw new UnauthorizedException('Token required');

    try {
      // ? Validar token...
      const secret = process.env.JWT_SECRET;

      const payload = this.jwtService.verify<
        Omit<JwtPayload, 'exp' | 'iat'> & {
          exp: number;
          iat: number;
          isAdmin: boolean;
        }
      >(token, { secret });

      const user: JwtPayload = {
        ...payload,
        roles: payload.isAdmin ? [Role.Admin] : [Role.User],
        exp: new Date(payload.exp * 1000),
        iat: new Date(payload.iat * 1000),
      };

      console.log(payload);
      console.log(user);
      // ? Adjuntamos el payload a la request
      (request as Request & { user: JwtPayload }).user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token o expired');
    }
  }
}
