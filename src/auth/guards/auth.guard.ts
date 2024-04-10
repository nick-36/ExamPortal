import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
   
    return true;
  }
}
