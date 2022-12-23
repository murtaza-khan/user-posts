import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AreaSchema, LanguageSchema } from './general.schema';
import { ProfileService } from './general.service';
import { UserModule } from '../user/user.module';
import { CategoriesController } from './categories.controller';
import { LanguagesController } from './languages.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Language', schema: LanguageSchema }, { name: 'Area', schema: AreaSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [ProfileService],
  exports: [ProfileService],
  controllers: [CategoriesController, LanguagesController],
})
export class ProfileModule { }
