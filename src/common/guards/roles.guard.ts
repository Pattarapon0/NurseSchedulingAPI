import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get(Roles, context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user && user.role && requiredRoles.includes(user.role);
    }
}