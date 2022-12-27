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

@Controller('')
@ApiTags('States')
export class StatesController {
  constructor(private generalService: GeneralService) { }

  @Get('states')
  getStates(): Promise<any> {
    return this.generalService.getState();
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post('state')
  createStates(@Body() data: State): Promise<any> {
    return this.generalService.createState(data);
  }
}
