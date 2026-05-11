import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  id: string;
  email: string;
  exp: number;
  iat: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // ? llega por headers el token
    const token = request.headers.authorization?.split(' ')[1];

    // * ['Bearer', 'xxxxx']

    if (!token) {
      throw new UnauthorizedException('Token required');
    }

    try {
      // ? Validar token...
      const secret = process.env.JWT_SECRET;

      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret,
      });

      payload.exp = new Date(payload.exp * 1000).getTime();
      payload.iat = new Date(payload.iat * 1000).getTime();

      // ? Adjuntamos el payload a la request
      // request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token o expired');
    }
  }
}
