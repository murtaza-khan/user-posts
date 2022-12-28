import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Category extends Document {
  name: string;
  states: [
    { type: mongoose.Schema.Types.ObjectId, ref: "State" },
  ],
}
