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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.usersService.getUsersService(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserByIdService(id);
  }

  @Post()
  createUser(@Body() user) {
    return this.usersService.createUserService(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user) {
    return this.usersService.updateUserService(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserService(id);
  }
}
