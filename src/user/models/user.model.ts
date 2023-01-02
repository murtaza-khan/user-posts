
import { BillingStructure, OfficeType, OralProficiency, RepresentType, BusinessType, UserType, LanguageEnumType } from '../../common/enums';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
class Address {
  @Prop()
  address: string;

  @Prop()
  postalCode: number;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;
}

class Business {
  @Prop()
  name: string;

  @Prop()
  isGeneralCounselor?: boolean;

  @Prop({ type: [String], enum: BusinessType })
  businessType?: BusinessType;

  @Prop()
  registeredDate?: Date;

  @Prop()
  EIN?: string;

  @Prop()
  businessPhone?: string;

  @Prop()
  website?: string;

  @Prop()
  businessDescription?: string;


  @Prop()
  addresses?: Address[];

}

class Experience {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  practiceAreas: string;

  @Prop()
  industry: string;

  @Prop()
  court: string;
}

class Language {
  @Prop()
  language: string;

  @Prop({ type: String, enum: LanguageEnumType })
  languageType: LanguageEnumType;

  @Prop({ type: String, enum: OralProficiency })
  oralProficiency: OralProficiency;

  @Prop({ type: String, enum: OralProficiency })
  writtenProficiency: OralProficiency;
}

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

  @Prop({ type: String, enum: UserType })
  userType: string;

  @Prop()
  isEmailVerified: boolean;

  @Prop()
  emailVerificationAttempts: number;

  @Prop()
  designation: string;

  @Prop()
  stepsCompleted: number

  @Prop()
  firmName: string;

  @Prop()
  firmWebsite: string;

  @Prop({ type: [String], enum: BillingStructure })
  billingStructure: BillingStructure[];

  @Prop()
  ratePerHourMin?: number;

  @Prop()
  ratePerHourMax?: number;

  @Prop()
  onContingency: number;

  @Prop([Language])
  languages: Language[]

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



  @Prop([Experience])
  experiences: Experience[];

  @Prop([Business])
  businesses: Business[];

  @Prop([Address])
  addresses: Address[];

  @Prop()
  subscription: string;
}


export const UserSchema = SchemaFactory.createForClass(User);

