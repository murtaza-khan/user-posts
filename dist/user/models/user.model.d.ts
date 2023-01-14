import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/base.model';
import { Post } from 'src/post/models/post.model';
export type UserDocument = HydratedDocument<User>;
export declare class User extends BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    posts: Post[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
