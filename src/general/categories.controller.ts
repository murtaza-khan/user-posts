import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,

} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GeneralService } from './general.service';
import { Category } from './Dto/general.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { constructSuccessResponse } from '../common/wrappers';

@Controller('')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private generalService: GeneralService) { }

  @Get('categories')
  async getCategories(): Promise<any> {
    return this.generalService.findCategories();
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post('categories')
  async createCategories(@Body() data: Category): Promise<any> {
    return this.generalService.createCategory(data);
  }
}
