import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
@UseGuards(AuthGuard)
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
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserByIdService(id);
  }

  // @Post()
  // createUser(@Body() user: CreateUserDto) {
  //   return this.usersService.createUserService(user);
  // }

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
