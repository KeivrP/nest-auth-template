import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enums/rol.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  // Método canActivate que se ejecuta antes de permitir el acceso a una ruta
  canActivate(context: ExecutionContext): boolean {
    // Obtener el rol requerido de los metadatos utilizando el Reflector
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no se especifica un rol, permitir el acceso
    if (!role) {
      return true;
    }

    // Obtener el usuario de la solicitud
    const { user } = context.switchToHttp().getRequest();

    // Verificar si el usuario tiene el rol de administrador
    if (user.role === Role.ADMIN) {
      return true;
    }

    // Verificar si el rol del usuario coincide con el rol requerido
    return role === user.role;
  }
}
