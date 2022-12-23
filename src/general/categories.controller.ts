import {
  Controller,
  Post,
  Body,
  UseGuards,

} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './general.service';
import { Category } from './Dto/general.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { constructSuccessResponse } from '../common/wrappers';

@Controller('')
@ApiBearerAuth('JWT-auth')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private profileService: ProfileService) { }

  // @Get('categories')
  async getCategories(): Promise<any> {
    return constructSuccessResponse(await this.profileService.findAreas());
  }

  @UseGuards(AuthGuard('jwt'))
  // @Post('categories')
  async createCategories(@Body() data: Category): Promise<any> {
    return this.profileService.createArea(data);
  }
}
