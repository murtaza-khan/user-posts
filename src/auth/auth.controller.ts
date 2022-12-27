import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { GenerateTokenDto, LoginDto, updatePasswordDto, UserDto, VerificationTokenDto } from '../user/Dto/user.types';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }
  @ApiTags('Auth')
  @Post('register')
  async create(@Body() userData: UserDto): Promise<any> {
    const user = await this.userService.save(userData);
    return user;
  }

  @ApiTags('Auth - Email Code Verification')
  @Post('send-email-code')
  async generateToken(@Body() data: GenerateTokenDto): Promise<any> {
    return this.authService.generateToken(data);
  }

  @ApiTags('Auth - Email Code Verification')
  @Post('verify-email-code')
  async verifyToken(@Body() data: VerificationTokenDto): Promise<any> {
    return this.authService.verifyEmailCode(data);
  }

  @ApiTags('Auth')
  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @ApiTags('Auth - Update Password')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post('update-password')
  async updatePassword(@Request() req, @Body() data: updatePasswordDto): Promise<any> {
    return this.userService.updatePassword(data,req.user.person);
  }
}
