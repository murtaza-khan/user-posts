import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

class Language {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;


}

class Category {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: [String],
  })
  @IsString()
  @IsNotEmpty()
  states: string[];
}

export { Language, Category };
