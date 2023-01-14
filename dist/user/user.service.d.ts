import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { UserDocument } from './models/user.model';
import { UpdateUserDto } from './Dto/user.types';
export declare class UserService {
    private cacheManager;
    private readonly userModel;
    constructor(cacheManager: Cache, userModel: Model<UserDocument>);
    save(userData: any): Promise<any>;
    findOne(id: any): Promise<any>;
    findByCriteria(criteria: any): Promise<any>;
    updateUser(data: UpdateUserDto, userId: any): Promise<any>;
    beforeCreate(userData: any): Promise<boolean>;
}
