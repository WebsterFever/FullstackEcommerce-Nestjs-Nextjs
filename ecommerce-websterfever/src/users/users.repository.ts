/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

  getUsers(page: number, limit: number): Partial<User>[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const userPage = this.users.slice(startIndex, endIndex);
    // const users = this.users.map(
    //   ({ password, ...usersWithoutPassword }) => usersWithoutPassword,
    // );
    // return users;

    return userPage.map(
      ({ password, ...usersWithoutPassword }) => usersWithoutPassword,
    );
  }

  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) return undefined;

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  getUserByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  createUser(user) {
    const id = this.users.length + 1;
    this.users.push({ id, ...user });

    return user;
  }

  updateUser(id: number, userUpdated) {
    const userFound = this.users.find((user) => user.id === id);

    if (!userFound) return 'User not found';

    const updatedUser = { ...userFound, ...userUpdated };
    const { password, ...userWithoutPassword } = updatedUser;
    this.users.map((user) => (user.id === +id ? userWithoutPassword : user));

    return userWithoutPassword;
  }

  deleteUser(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) return 'User not found';

    this.users = this.users.filter((user) => user.id !== id);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
