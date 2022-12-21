import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  UseGuards,
  Patch,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { constructSuccessResponse } from '../common/wrappers';
import { ProfileType } from './Dto/user.types';

@Controller('user')
@ApiBearerAuth('JWT-auth')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req) {
    const user = JSON.parse(JSON.stringify(await this.userService.findUserAndPopulateProfile(req.user.email)));
    delete user.password;
    return constructSuccessResponse(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('')
  async update(@Request() req, @Body() data: ProfileType): Promise<any> {
    console.log('>>>>>>>>>>>>>',req.user.person);
    
    data.userId = req.user.person;
    return this.userService.updateProfile(data);
  }
}
