import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersRepository,
      useClass: UsersRepository,
    },
    {
      provide: UsersService,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
