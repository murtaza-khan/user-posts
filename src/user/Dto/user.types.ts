import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { UserType } from '../../common/enums';

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
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  isGeneralCounselor?: boolean;


  @IsString()
  @IsOptional()
  businessName: string;

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
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  verification_token: number;
}

export { UserDto, DefaultMessageType, LoginDto, GenerateTokenDto, VerificationTokenDto };
