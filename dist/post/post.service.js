"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const wrappers_1 = require("../common/wrappers");
const user_service_1 = require("../user/user.service");
let PostService = class PostService {
    constructor(postModel, cacheManager, userService) {
        this.postModel = postModel;
        this.cacheManager = cacheManager;
        this.userService = userService;
    }
    async createPost(data) {
        try {
            const post = new this.postModel(data);
            const response = await post.save();
            await this.cacheManager.set(`post-${response.id}`, response, 0);
            return (0, wrappers_1.constructSuccessResponse)(response, 'Post created successfully');
        }
        catch (error) {
            return error;
        }
    }
    async findPostById(id) {
        let post;
        post = await this.cacheManager.get(`post-${id}`);
        if (!post) {
            post = await this.postModel.findById(id);
            await this.cacheManager.set(`post-${post.id}`, post, 0);
        }
        return (0, wrappers_1.constructSuccessResponse)(post, 'Post fetched successfully');
    }
    async updatePost(data, postId) {
        try {
            const post = await this.postModel.findByIdAndUpdate(postId, data, {
                new: true,
            });
            await this.cacheManager.set(`post-${post.id}`, post, 0);
            return (0, wrappers_1.constructSuccessResponse)(post, 'Post updated successfully');
        }
        catch (error) {
            return error;
        }
    }
    async findPostsByUserId(id) {
        let user = await this.userService.findByCriteria({ _id: id });
        if (!user) {
            return (0, wrappers_1.constructErrorResponse)({
                message: 'User not found!',
                status: 404,
            });
        }
        let posts = await this.postModel.find({ userId: id });
        user.posts = posts;
        return (0, wrappers_1.constructSuccessResponse)(user);
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Post')),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model, Object, user_service_1.UserService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map