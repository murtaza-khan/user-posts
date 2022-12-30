
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { State } from './state.model';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  isIndividual: boolean;

  @Prop()
  isBusinesses: boolean;

  @Prop()
  isLocationDependency: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'State' }] })
  states: State[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);