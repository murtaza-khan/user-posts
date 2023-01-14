import { InjectModel } from '@nestjs/mongoose';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import {
  constructErrorResponse,
  constructSuccessResponse,
} from '../common/wrappers';
import { UserDocument } from './models/user.model';
import { UpdateUserDto } from './Dto/user.types';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async save(userData: any): Promise<any> {
    try {
      await this.beforeCreate(userData);
      let userToSave = await new this.userModel(userData);
      const user = await userToSave.save();
      await this.cacheManager.set(`userId-${user._id}`, user, 0);

      return constructSuccessResponse(user, 'User created successfully!');
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
  async findOne(id: any): Promise<any> {
    let user;
    user = await this.cacheManager.get(`userId-${id}`);
    if (!user) {
      user = await this.userModel.findOne({ _id: id });
      await this.cacheManager.set(`userId-${user._id}`, user, 0);
    }
    return constructSuccessResponse(user, 'User Fetch successfully!');
  }
  async findByCriteria(criteria): Promise<any> {
    const user = await this.userModel.findOne(criteria);
    return user;
  }

  async updateUser(data: UpdateUserDto, userId): Promise<any> {
    try {
      const user = await this.userModel.findByIdAndUpdate(userId, data, {
        new: true,
      });
      await this.cacheManager.del(`userId-${user._id}`);
      await this.cacheManager.set(`userId-${user._id}`, user, 0);
      return constructSuccessResponse(user, 'User updated successfully!');
    } catch (error) {
      return error;
    }
  }

  async beforeCreate(userData: any) {
    try {
      if (userData.email) {
        const existingUser = await this.userModel.findOne({
          $or: [{ email: userData.email }, { userName: userData.userName }],
        });
        if (existingUser) {
          return constructErrorResponse({
            message: 'Email Or UserName already exists!',
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
