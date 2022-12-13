import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() data) {
    const response = await this.authService.login(data);
    return response;
  }
}
