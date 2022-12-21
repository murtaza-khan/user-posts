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
    return new Promise(async (resolve, reject) => {
      const person = await this.userService.findByCriteria({ email });
      if (!person) {
        return reject({ message: 'Email not found!', status: 404 });
      }
      bcrypt.compare(pass, person.password, (err, res) => {
        if (res) {
          return resolve(person);
        } else {
          resolve(new UnauthorizedException('Password Incorrect!'));
        }
      });
    });
  }
  async login(person: any) {
    try {
      let user: any = await this.validateUser(person.email, person.password);
      const payload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(payload);
      const response = JSON.parse(JSON.stringify(user));
      delete response.password;
      delete response.verification_token;
      return constructSuccessResponse({ accessToken, user: response }, 'You are logged in Successfully!');
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async generateToken(data: GenerateTokenDto) {
    const response = await this.userService.generateToken(
      data.email);
    if (response && response.nModified > 0) {
      return { message: 'Token Generated Successfully!', status: 200 };
    } else {
      return constructErrorResponse({ message: 'Token not generated!', status: 400 });
    }
  }

  async verificationToken(data: VerificationTokenDto) {
    const response = await this.userService.verifyToken(
      data.email,
      data.verification_token,
    );
    if (response && response.nModified > 0) {
      return { message: 'Token Verified Successfully!', status: 200 };
    } else {
      return constructErrorResponse({ message: 'Token not Verified!', status: 400 });
    }
  }


}
