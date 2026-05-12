import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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

  async updateUser(id: string, user: Partial<User>): Promise<Partial<User>> {
    await this.usersRepository.update(id, user);

    const updatedUser = await this.usersRepository.findOneBy({ id });
    //const updatedUser = await this.getUserById(id) as Promise<User>;

    if (!updatedUser)
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);

    const { password, ...userNoPassword } = updatedUser;

    return userNoPassword;
  }

  async deleteUser(id: string): Promise<Partial<User>> {
    const user = await this.usersRepository.findOneBy({ id });

    // const user = await this.getUserById(id);

    if (!user)
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);

    await this.usersRepository.remove(user);

    const { password, ...userNoPassword } = user;

    return userNoPassword;
  }
}
