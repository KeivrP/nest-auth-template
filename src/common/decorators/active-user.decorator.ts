import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// Creación del decorador personalizado llamado 'ActiveUser'
export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Obtenemos la solicitud HTTP del contexto
    const request = ctx.switchToHttp().getRequest();
    // Devolvemos el objeto 'user' desde la solicitud
    return request.user;
  }
);
