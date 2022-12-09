import { Document } from 'mongoose';
export interface Profile extends Document {
  firmName: string;
  firmWebsite: string;
  billingStructure: string;
  ratePerHourMin?: string;
  ratePerHourMax?: string;
  onContingency: string;
  represent: ['Individuals', 'Companies', 'Both'];
  practiceAreas: [string];
  practicingLawSince: Date;
  licenseNumber: string;
  locationPermitted: string;
  biography: string;
  officeType: ['Physical', 'Virtual'];
  primaryLanguage: string;
  secondaryLanguage: string;
  oralProficiency: ['Native', 'Fluent', 'Intermediate', 'Beginner'];
  writtenProficiency:  ['Native', 'Fluent', 'Intermediate', 'Beginner'];
  /**
   * userId is relationId business with user
   */
  userId: string;
}
