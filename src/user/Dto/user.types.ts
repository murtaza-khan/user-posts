import { Field, InputType, ObjectType } from 'type-graphql';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { UserRoles } from '../../common/enums';

@InputType()
class PersonInputType {
  @Field()
  @MaxLength(20)
  @MinLength(2)
  firstName: string;

  @Field()
  @MaxLength(20)
  @MinLength(2)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MaxLength(15)
  @MinLength(8)
  password: string;

  @Field()
  @MaxLength(17)
  @MinLength(8)
  phone: string;

  @Field({ nullable: true })
  avatar: string;
}
@InputType()
class LoginInputType {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}

@InputType()
class UpdatePersonInputType {
  @Field()
  @MaxLength(24)
  @MinLength(24)
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  // @ValidateIf(o => o.otherProperty === 'value')
  lastName: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  avatar: string;
}
@ObjectType()
class DefaultMessageType {
  @Field()
  @IsString()
  message: string;
}

@ObjectType()
class UserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field(() => [UserRoles])
  @IsNotEmpty()
  userType: UserRoles;
}
@ObjectType()
class LoginType {
  @Field()
  access_token: string;
}

export {
  PersonInputType,
  UserDto,
  DefaultMessageType,
  UpdatePersonInputType,
  LoginInputType,
  LoginType,
};
