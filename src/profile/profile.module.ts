import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { AreaSchema, LanguageSchema, ProfileSchema } from './profile.schema';
import { ProfileService } from './profile.service';
import { UserModule } from '../user/user.module';
import { CategoriesController } from './categories.controller';
import { LanguagesController } from './languages.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }, { name: 'Language', schema: LanguageSchema }, { name: 'Area', schema: AreaSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [ProfileService],
  exports: [ProfileService],
  controllers: [ProfileController, CategoriesController, LanguagesController],
})
export class ProfileModule { }
