import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserType } from '../../common/enums';

class DefaultMessageType {
  @IsString()
  message: string;
}

class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  userType: string;
}
class LoginType {
  access_token: string;
}

class AddressType {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  postalCode: number;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;
}

class BusinessType {
  @IsNotEmpty()
  businessName: string;

  @IsNotEmpty()
  businessType: string;

  @IsNotEmpty()
  registeredDate: string;

  @IsNotEmpty()
  EIN: string;

  @IsNotEmpty()
  businessPhone: string;

  @IsNotEmpty()
  website: string;

  @IsNotEmpty()
  businessDescription: string;
}

class ExperienceType {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  practiceAreas: string;

  @IsNotEmpty()
  industry: string;

  @IsNotEmpty()
  court: string;
}

class Language {
  @IsString()
  @IsNotEmpty()
  name: string;
}
export {
  UserDto,
  DefaultMessageType,
  LoginType,
  AddressType,
  BusinessType,
  ExperienceType,
  Language
};
