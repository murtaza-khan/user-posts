import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsArray, IsString, IsNotEmpty, IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { UserType, VerifyCodeSource } from '../../common/enums';
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
  name: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  isGeneralCounselor?: boolean;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  businessType?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  registeredDate?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  EIN?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  businessPhone?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  businessDescription?: string;


  @IsArray()
  @IsOptional()
  addresses?: AddressType[];

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
  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  firmName?: string;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  firmWebsite?: string;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  billingStructure?: string;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  ratePerHourMin?: string;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  ratePerHourMax?: string;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  onContingency?: string;

  // @ApiProperty({ enum: RepresentType })
  @IsEnum(RepresentType)
  @IsString()
  @IsOptional()
  represent?: string;

  // @ApiProperty({
  //   type: [String],
  // })
  @IsArray()
  @IsOptional()
  practiceAreas?: [string];

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  practicingLawSince?: Date;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  licenseNumber?: string;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  locationPermitted?: string;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  biography?: string;

  // @ApiProperty({ enum: OfficeType })
  @IsEnum(OfficeType)
  @IsString()
  @IsOptional()
  officeType?: string;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  primaryLanguage?: string;

  // @ApiProperty({
  //   type: String,
  // })
  @IsString()
  @IsOptional()
  secondaryLanguage?: string;

  // @ApiProperty({ enum: OralProficiency })
  @IsEnum(OralProficiency)
  @IsString()
  @IsOptional()
  oralProficiency?: string;

  // @ApiProperty({ enum: OralProficiency })
  @IsEnum(OralProficiency)
  @IsString()
  @IsOptional()
  writtenProficiency?: string;

  // @ApiProperty({
  //   type: [ExperienceType],
  // })
  @IsOptional()
  @IsArray()
  experience?: ExperienceType[];

  // @ApiProperty({
  //   type: [BusinessType],
  // })
  @IsOptional()
  @IsArray()
  business?: BusinessType[];

  // @ApiProperty({
  //   type: [AddressType],
  // })
  @IsOptional()
  @IsArray()
  address?: AddressType[];


  @ApiProperty({ enum: SubscriptionPackages })
  @IsEnum(SubscriptionPackages)
  @IsString()
  @IsOptional()
  subscription?: string;
  /**
   * userId is relationId business with user
   */
  @IsString()
  @IsOptional()
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


class DefaultMessageType {
  @IsString()
  message: string;
}

class UserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: BusinessType,
  })
  @IsOptional()
  business?: BusinessType;

  @ApiProperty({ enum: UserType })
  @IsEnum(UserType)
  @IsNotEmpty()
  userType: string;
}
class LoginDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

class GenerateTokenDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  email: string;
}

class VerificationTokenDto {
  @ApiProperty({ type: String, enum: VerifyCodeSource })
  @IsString()
  @IsOptional()
  source: string = VerifyCodeSource.EMAIL_VERIFICATION;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  verificationToken: number;
}

export { UserDto, DefaultMessageType, LoginDto, GenerateTokenDto, VerificationTokenDto, ProfileType, AddressType, BusinessType, ExperienceType, Language };
