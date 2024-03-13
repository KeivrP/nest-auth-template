import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para registrar un nuevo usuario
  @Post('register')
  register(
    @Body() registerDto: RegisterDto, // Utiliza el DTO RegisterDto para validar y procesar los datos de registro
  ) {
    return this.authService.register(registerDto);
  }

  // Endpoint para iniciar sesión
  @Post('login')
  login(
    @Body() loginDto: LoginDto, // Utiliza el DTO LoginDto para validar y procesar los datos de inicio de sesión
  ) {
    return this.authService.login(loginDto);
  }

  // Endpoint para obtener el perfil del usuario autenticado
  @ApiBearerAuth()
  @Get('profile')
  @Auth(Role.USER) // Requiere el rol de usuario para acceder
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user); // Obtiene el perfil del usuario a partir de los datos del usuario activo
  }
}
