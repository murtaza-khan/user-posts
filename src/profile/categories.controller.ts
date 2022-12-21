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
@ApiTags('Categories')
export class CategoriesController {
  constructor(private profileService: ProfileService) { }

  @Get('area-categories')
  async getCategories(): Promise<any> {
    return constructSuccessResponse(await this.profileService.findAreas());
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('area-categories')
  async createCategories(@Body() data: Language): Promise<any> {
    return this.profileService.createArea(data);
  }
}