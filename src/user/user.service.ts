import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { passwordBcrypt } from '../common/bcrypt';
import { User } from './models/user.model';
import { constructErrorResponse, constructSuccessResponse } from '../common/wrappers';
import { updatePasswordDto, VerificationTokenDto } from './Dto/user.types';
import { VerifyCodeSource } from '../common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }

  async save(userData: any): Promise<any> {
    try {
      await this.beforeCreate(userData);
      userData.password = await passwordBcrypt(userData.password);
      let user = await (new this.userModel({ ...userData, isEmailVerified: false })).save();

      user = JSON.parse(JSON.stringify(user));
      delete user.password;
      await this.generateToken(user.email);
      return constructSuccessResponse(user, 'User registered successfully!');
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async findAll(id?: any): Promise<any[]> {
    return await this.userModel.find();
  }
  async findOne(id: any): Promise<any> {
    return await this.userModel.findOne({ _id: id });
  }
  async findByCriteria(criteria: {}): Promise<any> {
    const user = await this.userModel.findOne(criteria);
    return user;
  }

  async updateAccessToken(user) {
    const updateAccessToken = await this.userModel.updateOne(
      { _id: user.id },
      { access_token: user.access_token },
    );
  }
  async update(user: any): Promise<{ message: string }> {
    return new Promise(async (resolve, rejects) => {
      if (user.password) {
        user.password = await passwordBcrypt(user.password);
      }
      this.userModel.updateOne({ _id: user.id }, user, (err, result) => {
        if (err) {
          rejects(err);
        }
        if (result) {
          if (result.nModified === 0) {
            resolve({ message: 'User not updated!' });
          } else {
            resolve({ message: 'User  updated!' });
          }
        }
      });
    });
  }

  async findUserAndPopulateProfile(email) {
    const me = await this.userModel.findOne({
      email,
    });
    const user = JSON.parse(JSON.stringify(me));
    delete user.password;
    delete user.verificationToken;
    return constructSuccessResponse(user, "User fetched successfully");
  }
  async generateToken(email) {
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const response = await this.userModel.updateOne(
      {
        email,
      },
      //token hardcoded 123456 for now. It will be used random token when we integrated email
      { verificationToken: 123456 },
    );
    return response;
  }

  async verifyToken({ email, source, verificationToken }: VerificationTokenDto) {

    const user = await this.userModel.findOne({
      email
    });
    if (!user) {
      return constructErrorResponse({ message: 'Invalid code!', status: 400 });
    }

    if (source === VerifyCodeSource.EMAIL_VERIFICATION) {
      if (user.isEmailVerified) {
        return constructErrorResponse({ message: 'You email is already verified', status: 409 });
      }
    }

    if (user.emailVerificationAttempts >= 4) {
      return constructErrorResponse({ message: 'Account is blocked, please contact support', status: 403 });
    }

    if (user.verificationToken === verificationToken) {
      // Code in valid
      const response = await this.userModel.updateOne(
        {
          email,
        },
        {
          isEmailVerified: true,
          verificationToken: null,
        },
      );
      return { response, user };
    }

    // Code in invalid
    await this.userModel.updateOne(
      { email },
      { emailVerificationAttempts: user.emailVerificationAttempts ? user.emailVerificationAttempts + 1 : 1, },
    );
    return constructErrorResponse({ message: 'Invalid code!', status: 400 });
  }

  async beforeCreate(userData: any) {
    try {
      if (userData.email) {
        const existingUser = await this.userModel.findOne({
          email: userData.email,
        });
        if (existingUser) {
          return constructErrorResponse({
            message: 'Email already exists!',
            status: 404,
          });
        } else {
          return true;
        }
      }
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async updateProfile(data: any): Promise<any> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        data.userId,
        data,
        { new: true }
      );
      const response = user.toJSON();
      delete response.password;
      delete response.verificationToken;
      return constructSuccessResponse(response, 'Profile updated successfully!');
    } catch (error) {
      return error;
    }
  }

  async findUserProfile(data: any): Promise<any> {
    let user: any = await this.findUserAndPopulateProfile(
      data.email,
    );
    if (user) {
      const profile = await this.userModel.findOne({ _id: user._id });
      const response = JSON.parse(JSON.stringify(user));
      delete response.password;
      delete response.verificationToken;
      user = { user: response, profile };
      return user;
    } else {
      constructErrorResponse({ message: 'User not found', status: 404 });
    }
  }

  async updatePassword(data: updatePasswordDto): Promise<any> {
    try {
      data.password = await passwordBcrypt(data.password) as string;
      const user = await this.userModel.updateOne(
        { email: data.email },
        data);
      if (user.n > 0) {
        return constructSuccessResponse({}, 'Password updated successfully!');
      }
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
}
