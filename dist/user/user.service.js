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
exports.UserService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const wrappers_1 = require("../common/wrappers");
let UserService = class UserService {
    constructor(cacheManager, userModel) {
        this.cacheManager = cacheManager;
        this.userModel = userModel;
    }
    async save(userData) {
        try {
            await this.beforeCreate(userData);
            let userToSave = await new this.userModel(userData);
            const user = await userToSave.save();
            await this.cacheManager.set(`userId-${user._id}`, user, 0);
            return (0, wrappers_1.constructSuccessResponse)(user, 'User created successfully!');
        }
        catch (error) {
            return (0, wrappers_1.constructErrorResponse)(error);
        }
    }
    async findOne(id) {
        let user;
        user = await this.cacheManager.get(`userId-${id}`);
        if (!user) {
            user = await this.userModel.findOne({ _id: id });
            await this.cacheManager.set(`userId-${user._id}`, user, 0);
        }
        return (0, wrappers_1.constructSuccessResponse)(user, 'User Fetch successfully!');
    }
    async findByCriteria(criteria) {
        const user = await this.userModel.findOne(criteria);
        return user;
    }
    async updateUser(data, userId) {
        try {
            const user = await this.userModel.findByIdAndUpdate(userId, data, {
                new: true,
            });
            await this.cacheManager.del(`userId-${user._id}`);
            await this.cacheManager.set(`userId-${user._id}`, user, 0);
            return (0, wrappers_1.constructSuccessResponse)(user, 'User updated successfully!');
        }
        catch (error) {
            return error;
        }
    }
    async beforeCreate(userData) {
        try {
            if (userData.email) {
                const existingUser = await this.userModel.findOne({
                    $or: [{ email: userData.email }, { userName: userData.userName }],
                });
                if (existingUser) {
                    return (0, wrappers_1.constructErrorResponse)({
                        message: 'Email Or UserName already exists!',
                        status: 404,
                    });
                }
                else {
                    return true;
                }
            }
        }
        catch (error) {
            return (0, wrappers_1.constructErrorResponse)(error);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [Object, mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map