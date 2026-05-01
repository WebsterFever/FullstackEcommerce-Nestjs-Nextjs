import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuthStatus(): string {
    return 'This action returns the authentication status';
  }
}
