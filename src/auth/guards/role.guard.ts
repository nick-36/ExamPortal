import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userRoles = request.user;
    const requiredRoles = this.reflactor.get(Roles, context.getHandler());

    if (
      //   requiredRoles.every((requiredRole) => userRoles.includes(requiredRole))
      false
    ) {
      return true;
    }
    return false;
  }
}
