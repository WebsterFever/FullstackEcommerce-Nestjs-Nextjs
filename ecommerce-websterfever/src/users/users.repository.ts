import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async getUsers(page: number, limit: number): Promise<Partial<User>[]> {
    const skip = (page - 1) * limit;

    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string): Promise<Partial<User> | string> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (!user) return `No se encontró el usuario con id ${id}`;

    const { password, ...userNoPassword } = user;

    return userNoPassword;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  /**
 * Logic to create a user
 *
 * 1. Create an asynchronous function to create a user
 * 2. Go to database and save the new user
 * 3. Go back to database and search for the created user by id
 * 4. If user was not found, throw an error
 * 5. Remove password from user object
 * 6. Return the safe user without password
 */

  async createUser(user: Partial<User>): Promise<Partial<User>> {
    const newUser = await this.usersRepository.save(user);

    const dbUser = await this.usersRepository.findOneBy({
      id: newUser.id,
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    const { password, ...userNoPassword } = dbUser;

    return userNoPassword;
  }

/**
 * Logic to update a user
 *
 * 1. Create an asynchronous function to update a user by id
 * 2. Go to database and search for the user by id
 * 3. If user was not found, throw an error
 * 4. Go to database and update the user information by id
 * 5. Go back to database and search for the updated user by id
 * 6. If updated user was not found, throw an error
 * 7. Remove password from user object
 * 8. Return the updated safe user without password
 */

async updateUser(id: string, user: Partial<User>): Promise<Partial<User>> {

  const existingUser = await this.usersRepository.findOneBy({ id });

  if (!existingUser)
    throw new NotFoundException(`Usuario con id ${id} no encontrado`);

  await this.usersRepository.update(id, user);

  const updatedUser = await this.usersRepository.findOneBy({ id });

  if (!updatedUser)
    throw new NotFoundException(`Usuario con id ${id} no encontrado`);

  const { password, ...userNoPassword } = updatedUser;

  return userNoPassword;
}

/**
 * Logic to delete a user
 *
 * 1. Create an asynchronous function to delete a user by id
 * 2. Go to database and search for the user by id
 * 3. If user was not found, throw an error
 * 4. Go to database and remove the user
 * 5. Remove password from user object
 * 6. Return the deleted safe user without password
 */

async deleteUser(id: string): Promise<Partial<User>> {
  const user = await this.usersRepository.findOneBy({ id });

  if (!user)
    throw new NotFoundException(`Usuario con id ${id} no encontrado`);

  await this.usersRepository.remove(user);

  const { password, ...userNoPassword } = user;

  return userNoPassword;
}
}
