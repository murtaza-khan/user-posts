import { Document } from 'mongoose';
import { OfficeType, OralProficiency, RepresentType } from '../../common/enums';
import { AddressType, BusinessType, ExperienceType } from '../Dto/profile.types';
export interface Profile extends Document {
  firmName: string;
  firmWebsite: string;
  billingStructure: string;
  ratePerHourMin?: string;
  ratePerHourMax?: string;
  onContingency: string;
  represent: RepresentType;
  practiceAreas: [string];
  practicingLawSince: Date;
  licenseNumber: string;
  locationPermitted: string;
  biography: string;
  officeType: OfficeType;
  primaryLanguage: string;
  secondaryLanguage: string;
  oralProficiency: OralProficiency;
  writtenProficiency: OralProficiency;
  experiences: [ExperienceType];
  businesses: [BusinessType];
  addresses: [AddressType];
  subscription: string;
  /**
   * userId is relationId business with user
   */
  userId: string;
}
