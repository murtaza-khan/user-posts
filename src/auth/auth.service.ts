import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { GenerateTokenDto, VerificationTokenDto } from '../user/Dto/user.types';
import { constructErrorResponse, constructSuccessResponse } from '../common/wrappers';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }
  async validateUser(email: string, pass: string): Promise<any> {
    const person = await this.userService.findByCriteria({ email });
    if (!person) {
      return constructErrorResponse({ message: 'Email not found!', status: 404 });
    }
    const res = await bcrypt.compare(pass, person.password)
    if (res === true) {
      return person;
    } else {
      return constructErrorResponse({ message: 'Password Incorrect!', status: 401 });
    }
  }

  async getAccessToken(email, sub) {
    return this.jwtService.sign({ email, sub });
  }

  async login(person: any) {
    try {
      let user: any = await this.validateUser(person.email, person.password);

      const response = {
        user: undefined,
        accessToken: undefined,
      };

      if (user.isEmailVerified) {
        const payload = { email: user.email, sub: user._id };
        const accessToken = this.jwtService.sign(payload);

        response.accessToken = accessToken;
      }

      user = JSON.parse(JSON.stringify(user));
      delete user.password;
      delete user.verificationToken;

      response.user = user;
      
      return constructSuccessResponse(response, 'You are logged in successfully!');
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async generateToken(data: GenerateTokenDto) {
    const response = await this.userService.generateToken(
      data.email);
    if (response && response.n > 0) {
      return constructSuccessResponse({}, 'Token generated successfully!');
    } else {
      return constructErrorResponse({ message: 'Token not generated!', status: 400 });
    }
  }

  async verificationToken(data: VerificationTokenDto) {
    const response = await this.userService.verifyToken(
      data.email,
      data.verificationToken,
    );
    if (response && response.response.nModified > 0) {
      const accessToken = await this.getAccessToken(response.user.email, response.user._id);
      return constructSuccessResponse({ accessToken }, 'Token verified successfully!');
    } else {
      return constructErrorResponse({ message: 'Token not Verified!', status: 400 });
    }
  }


}
