/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuthStatus(): string {
    return this.authService.getAuthStatus();
  }

  @Post('SignIn')
  signIn(@Body() credentials: any) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
