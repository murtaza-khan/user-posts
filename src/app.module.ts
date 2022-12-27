import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProfileModule } from './general/general.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DATA_BASE}`),
    UserModule,
    AuthModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
