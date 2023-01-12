import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

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
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  userName: string;
}

class UpdateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    type: String,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  userName: string;
}

export { UserDto, UpdateUserDto, DefaultMessageType };
