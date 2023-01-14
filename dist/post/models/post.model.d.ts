import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/base.model';
import { User } from '../../user/models/user.model';
export type PostDocument = HydratedDocument<Post>;
export declare class Post extends BaseModel {
    title: string;
    liked: number;
    comments: string[];
    userId: User;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post>;
