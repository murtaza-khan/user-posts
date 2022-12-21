import * as mongoose from 'mongoose';
import { RepresentType } from '../common/enums';
import { AddressType, BusinessType, ExperienceType } from './Dto/profile.types';

export const ProfileSchema = new mongoose.Schema({
  firmName: String,
  firmWebsite: String,
  billingStructure: String,
  ratePerHourMin: String,
  ratePerHourMax: String,
  onContingency: String,
  represent: String,
  practiceAreas: Array,
  practicingLawSince: String,
  licenseNumber: String,
  locationPermitted: String,
  biography: String,
  officeType: String,
  primaryLanguage: String,
  secondaryLanguage: String,
  oralProficiency: String,
  writtenProficiency: String,
  experiences: Array,
  businesses: Array,
  addresses: Array,
  subscription: String,
  /**
   * userId
   */
  userId: String,
});

export const AreaSchema = new mongoose.Schema({
  name: String,
});

export const LanguageSchema = new mongoose.Schema({
  name: String,
});

