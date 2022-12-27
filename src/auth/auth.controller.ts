import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { GenerateTokenDto, LoginDto, UserDto, VerificationTokenDto } from '../user/Dto/user.types';
import { constructSuccessResponse } from '../common/wrappers';
import { UserService } from '../user/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }
  @Post('register')
  async create(@Body() userData: UserDto): Promise<any> {

    const user = await this.userService.save(userData);
    return user;
  }

  @Post('email-verification')
  async generateToken(@Body() data: GenerateTokenDto): Promise<any> {
    return this.authService.generateToken(data);
  }

  @Post('verify-email-code')
  async verifyToken(@Body() data: VerificationTokenDto): Promise<any> {
    return this.authService.verificationToken(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
