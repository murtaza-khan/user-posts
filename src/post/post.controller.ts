import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Request,
  Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import {  ApiTags } from '@nestjs/swagger';
import { PostDto, UpdatePostDto } from './Dto/post.types';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(
    private postService: PostService,
  ) {}

  @Post('')
  async create(@Body() postData: PostDto): Promise<any> {
    const user = await this.postService.createPost(postData);
    return user;
  }

  @Get('/:postId')
  async post(@Param('postId') postId: string) {
    return this.postService.findPostById(postId);
  }

  @Patch('/:postId')
  async update(
    @Param('postId') postId: string,
    @Body() data: UpdatePostDto,
  ): Promise<any> {
    return this.postService.updatePost(data, postId);
  }

  @Get('/:userId/posts')
  async userPost(@Param('userId') userId: string) {
    return this.postService.findPostsByUserId(userId);
  }
}
