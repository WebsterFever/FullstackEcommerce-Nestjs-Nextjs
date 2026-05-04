/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsersService(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserByIdService(id: string) {
    return this.usersRepository.getUserById(Number(id));
  }

  createUserService(user: User) {
    return this.usersRepository.createUser(user);
  }

  updateUserService(id: string, user: User) {
    return this.usersRepository.updateUser(Number(id), user);
  }

  deleteUserService(id: string) {
    return this.usersRepository.deleteUser(Number(id));
  }
}
