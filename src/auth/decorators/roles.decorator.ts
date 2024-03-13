import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums/rol.enum';

// Clave para el metadato de roles
export const ROLES_KEY = 'roles';

// Decorador Roles que asigna roles específicos a una ruta o controlador
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
