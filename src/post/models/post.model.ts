
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/base.model';
import { User } from '../../user/models/user.model';

export type PostDocument = HydratedDocument<Post>;

@Schema()
class ContentDto {
  @Prop()
  liked: number;

  @Prop()
  comment: string;
}

@Schema()
export class Post extends BaseModel {
  @Prop()
  title: string;

  @Prop()
  liked: number;

  @Prop([ContentDto])
  content: ContentDto[];

  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);