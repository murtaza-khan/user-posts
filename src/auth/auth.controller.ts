import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../user/Dto/user.types';
import { constructSuccessResponse } from '../common/wrappers';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() data: LoginDto) {
    const response = await this.authService.login(data);
    return constructSuccessResponse(response);
  }
}
