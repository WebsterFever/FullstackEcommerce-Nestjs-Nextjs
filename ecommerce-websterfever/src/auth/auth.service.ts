import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuthStatus(): string {
    return 'This action returns the authentication status';
  }
  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Data required');
    }

    // ? Verificar que exista el usuario:
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    // ? Comparar las contraseñas:
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new BadRequestException('Invalid Credentials');
    }

    // ? firmar token:
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: `Bienvenido, ${user.name}! you are logged in`,
      token,
    };
  }

  async signUp(user: CreateUserDto) {
    const { email, password } = user;

    // ? Verificar si existe el usuario:
    const foundUser = await this.usersRepository.getUserByEmail(email);

    if (foundUser) {
      throw new BadRequestException('Registered Email');
    }

    // ? Proceso de registro:
    // * Hashear la password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ? Guardar en DB:
    return await this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}
