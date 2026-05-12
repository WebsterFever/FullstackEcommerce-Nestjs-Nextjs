import type { Request } from 'express';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/user.dto';
import { Role } from './roles.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserAdminResponseDto } from './dto/user-admin.dto';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Req() req: Request,
  ) {
    //console.log(req.user);

    const users = this.usersService.getUsersService(page, limit);

    return plainToInstance(UserAdminResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserByIdService(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: CreateUserDto,
  ) {
    return this.usersService.updateUserService(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUserService(id);
  }
}
