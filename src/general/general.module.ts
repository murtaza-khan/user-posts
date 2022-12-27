import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema, LanguageSchema, StateSchema } from './general.schema';
import { GeneralService } from './general.service';
import { UserModule } from '../user/user.module';
import { CategoriesController } from './categories.controller';
import { LanguagesController } from './languages.controller';
import { StatesController } from './states.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Language', schema: LanguageSchema }, { name: 'Category', schema: CategorySchema }, { name: 'State', schema: StateSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [GeneralService],
  exports: [GeneralService],
  controllers: [CategoriesController, LanguagesController, StatesController],
})
export class ProfileModule { }
