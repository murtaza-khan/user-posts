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
import { ApiBearerAuth } from '@nestjs/swagger';
import { constructSuccessResponse } from '../common/wrappers';

@Controller('profile')
@ApiBearerAuth('JWT-auth')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req) {
    const data = await this.profileService.findUserAndPopulateProfile(req.user);
    return constructSuccessResponse(data);
  }

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

  @Get('area-categories')
  async getCategories(): Promise<any> {
    return constructSuccessResponse(await this.profileService.findAreas());
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('area-categories')
  async createCategories(@Body() data: Language): Promise<any> {
    return constructSuccessResponse({
      data: await this.profileService.createArea(data),
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('')
  async update(@Body() data: ProfileType): Promise<any> {
    return constructSuccessResponse({
      data: await this.profileService.updateProfile(data),
    });
  }
}
