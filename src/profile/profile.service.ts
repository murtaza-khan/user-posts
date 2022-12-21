import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Language } from './models/language.model';
import { Area } from './models/area.model';
import { Profile } from './models/profile.model';
import { UserService } from '../user/user.service';
import { constructErrorResponse, constructSuccessResponse } from '../common/wrappers';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Language') private readonly languageModel: Model<Language>,
    @InjectModel('Area') private readonly areaModel: Model<Area>,
    @InjectModel('Profile') private readonly profileModel: Model<Profile>,
    private readonly userService: UserService,
  ) { }

  async createLanguage(data: any): Promise<Language> {
    try {
      const createdLanguage = new this.languageModel(data);
      const response = await createdLanguage.save();
      return response;
    } catch (error) {
      return error;
    }
  }

  async findLanguages(_id?: any): Promise<any[]> {
    return await this.languageModel.find();
  }

  async createArea(data: any): Promise<any> {
    try {
      const createdArea = new this.areaModel(data);
      const response = await createdArea.save();
      return constructSuccessResponse(response);
    } catch (error) {
      return error;
    }
  }

  async findAreas(_id?: any): Promise<any[]> {
    return await this.areaModel.find();
  }

  async updateProfile(data: any): Promise<any> {
    try {
      const createdArea = await this.profileModel.updateOne(
        { userId: data.userId },
        data,
        { upsert: true },
      );
      if (createdArea.n > 0) {
        return constructSuccessResponse({}, 'Profile Updated Successfully!');
      } else {
        return constructSuccessResponse({}, 'Profile Already Updated!');
      }
    } catch (error) {
      return error;
    }
  }

  async findUserAndPopulateProfile(data: any): Promise<any> {
    let user: any = await this.userService.findUserAndPopulateProfile(
      data.email,
    );
    if (user) {
      const profile = await this.profileModel.findOne({ userId: user._id });
      const response = JSON.parse(JSON.stringify(user));
      delete response.password;
      delete response.verification_token;
      user = { user: response, profile };
      return user;
    } else {
      constructErrorResponse({ message: 'User not found', status: 404 });
    }
  }
}
