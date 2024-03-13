import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../common/enums/rol.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorator';

// Definición de la función Auth
export function Auth(role: Role) {
  // Aplicar los decoradores Roles y UseGuards a la función
  return applyDecorators(
    // Decorador Roles que asigna roles específicos a una ruta o controlador
    Roles(role),
    // Decorador UseGuards que aplica los guardias AuthGuard y RolesGuard
    UseGuards(AuthGuard, RolesGuard)
  );
}
