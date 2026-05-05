import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';

function validate(request: Request): boolean {
  const authHeader = request.headers.authorization;

  // Example: Basic email:password
  if (!authHeader) return false;

  const [email, password] = authHeader.split(':');

  if (!email || !password) return false;

  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    return validate(request);
  }
}
