import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { PostDocument } from './models/post.model';
import { UserService } from '../user/user.service';
export declare class PostService {
    private readonly postModel;
    private cacheManager;
    private userService;
    constructor(postModel: Model<PostDocument>, cacheManager: Cache, userService: UserService);
    createPost(data: any): Promise<any>;
    findPostById(id?: string): Promise<any>;
    updatePost(data: any, postId: any): Promise<any>;
    findPostsByUserId(id?: string): Promise<any>;
}
