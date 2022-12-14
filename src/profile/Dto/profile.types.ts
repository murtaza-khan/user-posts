import { IsArray, IsString, IsNotEmpty, IsEnum, IsOptional} from 'class-validator';
import { OfficeType, OralProficiency, RepresentType } from '../../common/enums';
class AddressType {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  postalCode: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

class BusinessType {
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsString()
  @IsNotEmpty()
  businessType: string;

  @IsString()
  @IsNotEmpty()
  registeredDate: string;

  @IsString()
  @IsNotEmpty()
  EIN: string;

  @IsString()
  @IsNotEmpty()
  businessPhone: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsNotEmpty()
  businessDescription: string;
}

class ExperienceType {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  practiceAreas: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsNotEmpty()
  court: string;
}

class ProfileType {
  @IsString()
  @IsNotEmpty()
  firmName: string;

  @IsString()
  @IsNotEmpty()
  firmWebsite: string;

  @IsString()
  @IsNotEmpty()
  billingStructure: string;

  @IsString()
  @IsNotEmpty()
  ratePerHourMin?: string;

  @IsString()
  @IsNotEmpty()
  ratePerHourMax?: string;

  @IsString()
  @IsNotEmpty()
  onContingency: string;

  @IsEnum(RepresentType)
  @IsString()
  @IsNotEmpty()
  represent: string;

  @IsArray()
  @IsNotEmpty()
  practiceAreas: [string];

  @IsString()
  @IsNotEmpty()
  practicingLawSince: Date;

  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @IsString()
  @IsNotEmpty()
  locationPermitted: string;

  @IsString()
  @IsNotEmpty()
  biography: string;

  @IsEnum(OfficeType)
  @IsString()
  @IsNotEmpty()
  officeType: string;

  @IsString()
  @IsNotEmpty()
  primaryLanguage: string;

  @IsString()
  @IsNotEmpty()
  secondaryLanguage: string;

  @IsEnum(OralProficiency)
  @IsString()
  @IsNotEmpty()
  oralProficiency: string;

  @IsEnum(OralProficiency)
  @IsString()
  @IsNotEmpty()
  writtenProficiency: string;

  @IsOptional()
  @IsArray()
  // @IsNotEmpty()
  experience?: ExperienceType[];

  @IsOptional()
  @IsArray()
  // @IsNotEmpty()
  business?: BusinessType[];

  @IsOptional()
  @IsArray()
  // @IsNotEmpty()
  address?: AddressType[];
  /**
   * userId is relationId business with user
   */

  @IsString()
  @IsNotEmpty()
  userId: string;
}

class Language {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export { ProfileType, AddressType, BusinessType, ExperienceType, Language };
