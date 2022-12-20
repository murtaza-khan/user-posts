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
import { ApiBearerAuth } from '@nestjs/swagger';
import { constructSuccessResponse } from '../common/wrappers';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthGuard('jwt'))
  // @Get(':id/user')
  // @ApiBearerAuth('JWT-auth')
  // async getOne(@Param('id') id): Promise<any> {
  //   const user = await this.userService.findOne(id);
  //   return constructSuccessResponse({ data: user });
  // }
}
