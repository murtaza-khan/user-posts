import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Language } from './models/language.model';
import { Category } from './models/category.model';
import { constructErrorResponse, constructSuccessResponse } from '../common/wrappers';
import { State } from './models/state.model';

@Injectable()
export class GeneralService {
  constructor(
    @InjectModel('Language') private readonly languageModel: Model<Language>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('State') private readonly stateModel: Model<State>,
  ) { }

  async createLanguage(data: any): Promise<any> {
    try {
      const createdLanguage = new this.languageModel(data);
      const response = await createdLanguage.save();
      return constructSuccessResponse(response, 'Language created successfully');
    } catch (error) {
      return error;
    }
  }

  async findLanguages(_id?: any): Promise<any> {
    const response = await this.languageModel.find();
    return constructSuccessResponse(response, 'Languages fetched successfully');

  }

  async createCategory(data: any): Promise<any> {
    try {
      let states = [];
      if (data.states && data.states.length) {
        for (const state of data.states) {
          const stateResponse = await this.stateModel.findOne({ _id: state });
          if (stateResponse) {
            states.push(state);
          }
        }
      }
      
      const createdCategory = new this.categoryModel({ ...data, states });
      const response = await createdCategory.save();
      return constructSuccessResponse(response, 'Category created successfully');
    } catch (error) {
      return error;
    }
  }

  async findCategories(_id?: any): Promise<any> {
    const categories: any = await this.categoryModel.find().populate('states');
    return constructSuccessResponse(categories, 'Categories fetched successfully');
  }

  async createState(data: any): Promise<any> {
    try {
      const createdState = new this.stateModel(data);
      const response = await createdState.save();
      return constructSuccessResponse(response, 'State created successfully');
    } catch (error) {
      return error;
    }
  }

  async getState(): Promise<any> {
    try {
      const createdState = await this.stateModel.find();
      return constructSuccessResponse(createdState, 'States fetched successfully');
    } catch (error) {
      return error;
    }
  }
}
