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
import { ProfileService } from './profile.service';
import { Language, ProfileType } from './Dto/profile.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { constructSuccessResponse } from '../common/wrappers';

@Controller('')
@ApiBearerAuth('JWT-auth')
@ApiTags('Languages')
export class LanguagesController {
  constructor(private profileService: ProfileService) { }
  @Get('languages')
  async getLanguages(): Promise<any> {
    return constructSuccessResponse(await this.profileService.findLanguages());
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('language')
  async createLanguage(@Body() data: Language): Promise<any> {
    return constructSuccessResponse(
      await this.profileService.createLanguage(data),
    );
  }
}
