import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { IsExist } from 'src/validation/is-exist.validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsExist(Category)
  categoryId: number;
}
