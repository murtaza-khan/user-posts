import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

class PostDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    example: 'Post content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: String,
    example: 'userId',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
class ContentDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  liked: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  comment: string;
}

class UpdatePostDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  liked: number;

  @ApiProperty({
    type: [ContentDto],
    example: 'Post content',
  })
  @IsArray()
  @IsOptional()
  content:ContentDto[] ;
}

export { PostDto, UpdatePostDto };
