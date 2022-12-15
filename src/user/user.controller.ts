import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDto } from './Dto/user.types';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  @ApiBearerAuth('JWT-auth')
  async getAll(): Promise<any> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/user')
  @ApiBearerAuth('JWT-auth')
  async getOne(@Param('id') id): Promise<any> {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Post('create')
  async create(@Body() userData: UserDto): Promise<any> {
    return await this.userService.save(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/update')
  @ApiBearerAuth('JWT-auth')
  async update(@Param('id') id, @Body() userData: any): Promise<any> {
    userData.id = id;
    return await this.userService.update(userData);
  }
}
