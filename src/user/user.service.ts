import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { passwordBcrypt } from '../common/bcrypt';
import { User } from './models/user.model';
import { constructErrorResponse } from '../common/wrappers';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async save(user: any): Promise<User> {
    try {
      const p = user;
      await this.beforeCreate(p);
      p.password = await passwordBcrypt(p.password);
      const createdUser = new this.userModel(p);
      const userResponse = await createdUser.save();
      return userResponse;
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
    console.log('LLLLLLLLL', user);

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
}
