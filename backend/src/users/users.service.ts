import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsersService(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserByIdService(id: string) {
    return this.usersRepository.getUserById(id);
  }

  createUserService(user: Partial<User>) {
    return this.usersRepository.createUser(user);
  }

  updateUserService(id: string, user: Partial<User>) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUserService(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
