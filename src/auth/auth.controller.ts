import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { GenerateTokenDto, LoginDto, UserDto, VerificationTokenDto } from '../user/Dto/user.types';
import { constructSuccessResponse } from '../common/wrappers';
import { UserService } from '../user/user.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('login')
  async login(@Body() data: LoginDto) {
    const response = await this.authService.login(data);
    return constructSuccessResponse(response);
  }
  @Post('register')
  async create(@Body() userData: UserDto): Promise<any> {
    return constructSuccessResponse({
      data: await this.userService.save(userData),
    });
  }

  @Post('generate-token')
  async generateToken(@Body() data: GenerateTokenDto): Promise<any> {
    return constructSuccessResponse(await this.authService.generateToken(data));
  }

  @Post('verify-token')
  async verifyToken(@Body() data: VerificationTokenDto): Promise<any> {
    return constructSuccessResponse(await this.authService.verificationToken(data));
  }
}
