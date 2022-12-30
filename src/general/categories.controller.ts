import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,

} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GeneralService } from './general.service';
import { Category } from './Dto/general.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private generalService: GeneralService) { }

  @Get('categories')
  async getCategories(): Promise<any> {
    return this.generalService.findCategories();
  }

  @Get('category/:id')
  async getCategory(@Param('id') id: string): Promise<any> {
    return this.generalService.findCategoryById(id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post('categories')
  async createCategories(@Body() data: Category): Promise<any> {
    return this.generalService.createCategory(data);
  }
}
