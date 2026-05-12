/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../users/roles.enum';
import { JwtPayload } from '../auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  //? Inyectamos "Reflector" que extrae la metadata:
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(), //? handler ruta que lo llamó
      context.getClass(), // ? Contexto de la clase
    ]);

    const request: Request = context.switchToHttp().getRequest();
    const user = (request as Request & { user: JwtPayload }).user; //rol de usuario 'admin'

    const hasRole = () =>
      requiredRoles.some((role) => {
        // console.log(user.roles, role);
        return user?.roles?.includes(role);
      });

    //const valid = user && user.roles && hasRole();

    // console.log(hasRole());
    // console.log(requiredRoles);

    if (!hasRole())
      throw new ForbiddenException(
        "You don't have permissions to access this route",
      );

    return true;
  }
}
