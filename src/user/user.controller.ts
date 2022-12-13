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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async getAll(): Promise<any> {
    return await this.userService.findAll();
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get(':id/user')
  async getOne(@Param('id') id): Promise<any> {
    const user = await this.userService.findOne(id);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() userData: UserDto): Promise<any> {
    return await this.userService.save(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/update')
  async update(@Param('id') id, @Body() userData: any): Promise<any> {
    userData.id = id;
    return await this.userService.update(userData);
  }
}
