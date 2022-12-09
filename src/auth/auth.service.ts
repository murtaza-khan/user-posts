import * as bcrypt from 'bcrypt';

import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly personService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email);
    return new Promise(async (resolve, reject) => {
      const person = await this.personService.findByCriteria({ email });
      bcrypt.compare(pass, person.password, (err, res) => {
        if (res) {
          return resolve(person);
        } else {
          resolve(new UnauthorizedException('Password Incorrect!'));
        }
      });
    });
  }
  async logIn(person) {
    const nn = await this.validateUser(person.email, person.password);
    console.log(nn);
  }
  async login(person: any) {
    const payload = { email: person.email, sub: person._id };
    // tslint:disable-next-line: variable-name
    const access_token = this.jwtService.sign(payload);
    person.access_token = 'Bearer ' + access_token;
    if (person.access_token) {
      this.personService.updateAccessToken(person);
      return person.access_token;
    }
  }
}
