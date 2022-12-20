import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { OfficeType, OralProficiency, RepresentType, SubscriptionPackages } from '../../common/enums';
class AddressType {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: Number,
  })
  @IsString()
  @IsNotEmpty()
  postalCode: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}

class BusinessType {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  businessType: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  registeredDate: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  EIN: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  businessPhone: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  website: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  businessDescription: string;
}

class ExperienceType {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  practiceAreas: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  court: string;
}

class ProfileType {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  firmName?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  firmWebsite?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  billingStructure?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  ratePerHourMin?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  ratePerHourMax?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  onContingency?: string;

  @ApiProperty({ enum: RepresentType })
  @IsEnum(RepresentType)
  @IsString()
  @IsOptional()
  represent?: string;

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsOptional()
  practiceAreas?: [string];

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  practicingLawSince?: Date;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  licenseNumber?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  locationPermitted?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  biography?: string;

  @ApiProperty({ enum: OfficeType })
  @IsEnum(OfficeType)
  @IsString()
  @IsOptional()
  officeType?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  primaryLanguage?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  secondaryLanguage?: string;

  @ApiProperty({ enum: OralProficiency })
  @IsEnum(OralProficiency)
  @IsString()
  @IsOptional()
  oralProficiency?: string;

  @ApiProperty({ enum: OralProficiency })
  @IsEnum(OralProficiency)
  @IsString()
  @IsOptional()
  writtenProficiency?: string;

  @ApiProperty({
    type: [ExperienceType],
  })
  @IsOptional()
  @IsArray()
  experience?: ExperienceType[];

  @ApiProperty({
    type: [BusinessType],
  })
  @IsOptional()
  @IsArray()
  business?: BusinessType[];

  @ApiProperty({
    type: [AddressType],
  })
  @IsOptional()
  @IsArray()
  address?: AddressType[];


  @ApiProperty({ enum: SubscriptionPackages })
  @IsEnum(SubscriptionPackages)
  @IsString()
  @IsOptional()
  subscriptionPackages?: string;
  /**
   * userId is relationId business with user
   */

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

class Language {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export { ProfileType, AddressType, BusinessType, ExperienceType, Language };
