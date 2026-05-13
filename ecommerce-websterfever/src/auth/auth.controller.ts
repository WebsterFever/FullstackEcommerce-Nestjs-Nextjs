import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../users/dto/user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuthStatus(): string {
    return this.authService.getAuthStatus();
  }

  @Post('signin')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Permite a los usuarios iniciar sesión proporcionando su correo electrónico y contraseña. Devuelve un token JWT si las credenciales son válidas por 24 horas.',
  })
  @ApiResponse({
    status: 201,
    description: 'Inicio de sesión exitoso. Devuelve un token JWT.',
  })
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;

    if (!email) return 'Invalid Credentials';
    if (!password) return 'Invalid Credentials';

    return this.authService.signIn(email, password);
  }

  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
