import { InjectModel } from '@nestjs/mongoose';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';

import {
  constructErrorResponse,
  constructSuccessResponse,
} from '../common/wrappers';
import { PostDocument } from './models/post.model';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UserService,
  ) {}

  async createPost(data: any): Promise<any> {
    try {
      const post = new this.postModel(data);
      const response = await post.save();
      await this.cacheManager.set(response.id, response, 0);
      await this.cacheManager.set(data.userId, response, 0);
      return constructSuccessResponse(response, 'Post created successfully');
    } catch (error) {
      return error;
    }
  }

  async findPostById(id?: string): Promise<any> {
    let post;
    post = await this.cacheManager.get(id);
    if (!post) {
      post = await this.postModel.findById(id);
      await this.cacheManager.set(post.id, post, 0);
    }
    return constructSuccessResponse(post, 'Post fetched successfully');
  }

  async updatePost(data: any, postId: any): Promise<any> {
    try {
      const post = await this.postModel.findByIdAndUpdate(postId, data, {
        new: true,
      });
      await this.cacheManager.set(post.id, post, 0);

      return constructSuccessResponse(post, 'Post updated successfully');
    } catch (error) {
      return error;
    }
  }

  async findPostsByUserId(id?: string): Promise<any> {
    let user;
    user = await this.cacheManager.get(id);
    if (!user) {
      user = await this.userService.findByCriteria({ _id: id });
      await this.cacheManager.set(user.id, user, 0);
    }
    if (!user) {
      return constructErrorResponse({
        message: 'User not found!',
        status: 404,
      });
    }
    let posts;
    posts = await this.cacheManager.get(id);
    if (!posts) {
      posts = await this.postModel.find({ userId: id });
    }
    user.posts = posts;
    return constructSuccessResponse(user);
  }
}
