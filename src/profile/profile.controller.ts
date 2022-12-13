import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { Language } from './Dto/profile.types';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('language')
  async getAll(): Promise<any> {
    return await this.profileService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('language')
  async create(@Body() data:Language): Promise<any> {
    return await this.profileService.save(data);
  }
}
