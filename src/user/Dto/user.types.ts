import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
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

export {
  UserDto,
  DefaultMessageType,
  LoginType
};
