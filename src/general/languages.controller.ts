import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GeneralService } from './general.service';
import { Language } from './Dto/general.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { constructSuccessResponse } from '../common/wrappers';

@Controller('')
@ApiBearerAuth('JWT-auth')
@ApiTags('Languages')
export class LanguagesController {
  constructor(private generalService: GeneralService) { }
  // @Get('languages')
  async getLanguages(): Promise<any> {
    return constructSuccessResponse(await this.generalService.findLanguages());
  }

  @UseGuards(AuthGuard('jwt'))
  // @Post('language')
  async createLanguage(@Body() data: Language): Promise<any> {
    return constructSuccessResponse(
      await this.generalService.createLanguage(data),
    );
  }
}
