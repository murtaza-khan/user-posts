import * as mongoose from 'mongoose';


export const CategorySchema = new mongoose.Schema({
  name: String,
  states: [
    { type: mongoose.Schema.Types.ObjectId, ref: "State" },
  ],
});

export const LanguageSchema = new mongoose.Schema({
  name: String,
});

export const StateSchema = new mongoose.Schema({
  name: String,
  code: String,
});

