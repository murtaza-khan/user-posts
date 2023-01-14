import { Controller, Post, Body, Param, Get, Patch ,Response} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from './Dto/user.types';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  async create(@Body() userData: UserDto, @Response() res): Promise<any> {
    res.set('Access-Control-Allow-Origin', '*');
    const user = await this.userService.save(userData);
    return res.send(user);
  }

  @Get('/:userId')
  async user(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Patch('/:userId')
  async update(
    @Param('userId') userId: string,
    @Body() data: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateUser(data, userId);
  }
}
