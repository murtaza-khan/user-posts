import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Language } from './models/language.model';
import { Area } from './models/area.model';
import { UserService } from '../user/user.service';
import { constructErrorResponse, constructSuccessResponse } from '../common/wrappers';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Language') private readonly languageModel: Model<Language>,
    @InjectModel('Area') private readonly areaModel: Model<Area>,
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
}
