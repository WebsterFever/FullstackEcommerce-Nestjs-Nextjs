import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuthStatus(): string {
    return this.authService.getAuthStatus();
  }

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;

    if (!email) return 'Invalid Credentials';
    if (!password) return 'Invalid Credentials';

    return this.authService.signIn(email, password);
  }
}
