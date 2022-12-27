import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,

} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GeneralService } from './general.service';
import { State } from './Dto/general.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { constructSuccessResponse } from '../common/wrappers';

@Controller('')
@ApiTags('States')
export class StatesController {
  constructor(private generalService: GeneralService) { }

  @Get('states')
  async getStates(): Promise<any> {
    return constructSuccessResponse(await this.generalService.getState());
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post('state')
  async createStates(@Body() data: State): Promise<any> {
    return this.generalService.createState(data);
  }
}
