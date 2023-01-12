
import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/base.model';
import { Post } from 'src/post/models/post.model';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User extends BaseModel{

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  userName: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

}


export const UserSchema = SchemaFactory.createForClass(User);

