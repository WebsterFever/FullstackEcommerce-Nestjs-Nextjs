import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuthStatus(): string {
    return 'This action returns the authentication status';
  }

  signIn(email: string, password: string) {
    // Aquí puedes implementar la lógica de autenticación, como verificar el correo electrónico y la contraseña
    // contra una base de datos o un servicio de autenticación externo.
    // Por ahora, simplemente devolveremos un mensaje de éxito.
    if (!email || !password) {
      return 'Email and password are required!';
    }
    const user = this.usersRepository.getUserByEmail(email);
    if (!user || user.password !== password) {
      return 'Invalid credentials!';
    }
    return 'Sign-in successful! Welcome back, ' + user.name + '!';
  }
}
