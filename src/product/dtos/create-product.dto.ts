import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { IsExist } from 'src/validation/is-exist.validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Nike',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;
  @ApiProperty({
    description: 'The sex',
    example: 'Male or Female',
  })
  @IsString()
  @IsNotEmpty()
  sex: string;
  @ApiProperty({
    description: 'The product model',
    example: 'Air Max 2021',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'The category ID',
    example: 1,
  })
  @IsNumber()
  @IsExist(Category)
  categoryId: number;
}
