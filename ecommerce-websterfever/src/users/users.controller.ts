/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.usersService.getUsersService(page, limit);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserByIdService(id);
  }

  @Post()
  createUser(@Body() user) {
    return this.usersService.createUserService(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user) {
    return this.usersService.updateUserService(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserService(id);
  }
}
