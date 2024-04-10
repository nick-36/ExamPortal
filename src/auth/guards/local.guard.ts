import { ExecutionContext,Injectable,Scope } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }
}
