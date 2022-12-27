import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Language } from './models/language.model';
import { Area } from './models/area.model';
import { UserService } from '../user/user.service';
import { constructErrorResponse, constructSuccessResponse } from '../common/wrappers';
import { State } from './models/state.model';

@Injectable()
export class GeneralService {
  constructor(
    @InjectModel('Language') private readonly languageModel: Model<Language>,
    @InjectModel('Area') private readonly areaModel: Model<Area>,
    @InjectModel('State') private readonly stateModel: Model<State>,
  ) { }

  async createLanguage(data: any): Promise<any> {
    try {
      const createdLanguage = new this.languageModel(data);
      const response = await createdLanguage.save();
      return constructSuccessResponse(response, 'Language created Successfully!');
    } catch (error) {
      return error;
    }
  }

  async findLanguages(_id?: any): Promise<any> {
    const response = await this.languageModel.find();
    return constructSuccessResponse(response, 'Languages fetched successfully!');

  }

  async createArea(data: any): Promise<any> {
    try {
      let states = [];
      if (data.states && data.states.length > 0) {
        for (const state of data.states) {
          const stateResponse = await this.stateModel.findOne({ _id: state });
          if (stateResponse) {
            states.push(state);
          }
        }
      }
      const createdArea = new this.areaModel({ ...data, states });
      const response = await createdArea.save();
      return constructSuccessResponse(response, 'Area created Successfully!');
    } catch (error) {
      return error;
    }
  }

  async findAreas(_id?: any): Promise<any> {
    let areasResponse = [];
    const areas: any = await this.areaModel.find();
    for (const area of areas) {
      if (area.states.length) {
        let states = []
        for (const state of area.states) {
          const stateResponse = await this.stateModel.findOne({ _id: state });
          if (stateResponse) {
            states.push(stateResponse);
          }
        }
        areasResponse.push({ name: area.name, states })
      }
    }
    return constructSuccessResponse(areasResponse, 'Areas fetched Successfully!');
  }

  async createState(data: any): Promise<any> {
    try {
      const createdState = new this.stateModel(data);
      const response = await createdState.save();
      return constructSuccessResponse(response, 'State Created Successfully!');
    } catch (error) {
      return error;
    }
  }

  async getState(): Promise<any> {
    try {
      const createdState = await this.stateModel.find();
      return constructSuccessResponse(createdState, 'States data fetched successfully!');
    } catch (error) {
      return error;
    }
  }
}
