import { Module, forwardRef, CacheModule } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './post.service';
import { UserModule } from '../user/user.module';
import { PostController } from './post.controller';
import { PostSchema } from './models/post.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
    ]),
    forwardRef(() => UserModule),
    CacheModule.register(),

  ],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
