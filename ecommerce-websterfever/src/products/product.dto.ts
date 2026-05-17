import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsInt,
  Min,
  IsOptional,
  IsUrl,
  IsUUID,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'iPhone 15 Pro',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiProperty({
    description: 'Detailed description of the product',
    example: 'Latest Apple smartphone with A17 chip',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description!: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 1999.99,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({
    description: 'Available stock quantity',
    example: 20,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock!: number;

  @ApiPropertyOptional({
    description: 'URL of the product image',
    example:
      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  })
  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @ApiProperty({
    description: 'UUID of the category associated with the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId!: string;
}
