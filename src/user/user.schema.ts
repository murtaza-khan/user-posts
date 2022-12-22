import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  password: String,
  verificationToken: String,
  isGeneralCounselor: Boolean,

  //profile
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
});
