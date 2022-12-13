import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Language } from './models/language.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Language') private readonly languageModel: Model<Language>,
  ) {}

  async save(data: any): Promise<Language> {
    try {
      const createdUser = new this.languageModel(data);
      const response = await createdUser.save();
      return response;
    } catch (error) {
      return error;
    }
  }

  async findAll(_id?: any): Promise<any[]> {
    return await this.languageModel.find();
  }
}
