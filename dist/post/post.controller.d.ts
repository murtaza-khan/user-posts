import { PostService } from './post.service';
import { PostDto, UpdatePostDto } from './Dto/post.types';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    create(postData: PostDto): Promise<any>;
    post(postId: string): Promise<any>;
    update(postId: string, data: UpdatePostDto): Promise<any>;
    userPost(userId: string): Promise<any>;
}
