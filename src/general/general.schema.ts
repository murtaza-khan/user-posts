import * as mongoose from 'mongoose';


export const AreaSchema = new mongoose.Schema({
  name: String,
  states: Array
});

export const LanguageSchema = new mongoose.Schema({
  name: String,
});

