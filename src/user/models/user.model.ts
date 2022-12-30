import { Document } from 'mongoose';
import { BillingStructure, OfficeType, OralProficiency, RepresentType } from '../../common/enums';
import { AddressType, BusinessType, ExperienceType } from '../Dto/user.types';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  profilePhoto: string;

  @Prop()
  businessLogo: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  verificationToken: number;

  @Prop()
  userType: string;

  @Prop()
  isEmailVerified: boolean;

  @Prop()
  emailVerificationAttempts: number;

  @Prop()
  designation: string;

  @Prop()
  firmName: string;
  
  @Prop()
  firmWebsite: string;

  @Prop({ type: String, enum: BillingStructure })
  billingStructure: BillingStructure;

  @Prop()
  ratePerHourMin?: string;

  @Prop()
  ratePerHourMax?: string;

  @Prop()
  onContingency: string;

  @Prop({ type: String, enum: RepresentType })
  represent: RepresentType;

  @Prop([String])
  practiceAreas: string[];

  @Prop({ type: Date })
  practicingLawSince: Date;

  @Prop()
  licenseNumber: string;

  @Prop()
  locationPermitted: string;

  @Prop()
  biography: string;

  @Prop({ type: String, enum: OfficeType })
  officeType: OfficeType;

  @Prop()
  primaryLanguage: string;

  @Prop()
  secondaryLanguage: string;

  @Prop({ type: String, enum: OralProficiency })
  oralProficiency: OralProficiency;

  @Prop({ type: String, enum: OralProficiency })
  writtenProficiency: OralProficiency;

  @Prop([ExperienceType])
  experiences: ExperienceType[];

  @Prop([BusinessType])
  business: BusinessType[];

  @Prop([AddressType])
  addresses: AddressType[];

  @Prop()
  subscription: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

