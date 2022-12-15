import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard,  } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { Language, ProfileType } from './Dto/profile.types';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('profile')
@ApiBearerAuth('JWT-auth')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('language')
  async getLanguages(): Promise<any> {
    return await this.profileService.findLanguages();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('language')
  async createLanguage(@Body() data:Language): Promise<any> {
    return await this.profileService.createLanguage(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('area-categories')
  async getCategories(): Promise<any> {
    return await this.profileService.findAreas();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('area-categories')
  async createCategories(@Body() data:Language): Promise<any> {
    return await this.profileService.createArea(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async update(@Body() data:ProfileType): Promise<any> {
    return await this.profileService.updateProfile(data);
  }
}
