import { Injectable } from '@nestjs/common';
import { User } from './users.interface';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      email: 'pepi@mail.com',
      name: 'Pepito',
      password: 'pepi123',
      address: 'calle 1234',
      phone: '115783654',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
    {
      id: 2,
      email: 'pepa@mail.com',
      name: 'Pepita',
      password: 'pepa123',
      address: 'calle 4567',
      phone: '2234786589',
    },
    {
      id: 3,
      email: 'mindy@mail.com',
      name: 'Mimis',
      password: 'pass123',
      address: 'calle 2345',
      phone: '5745783654',
      country: 'Colombia',
      city: 'Medellín',
    },
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user) {
    this.users.push(user);
  }
}
