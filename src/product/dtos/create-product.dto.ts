import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

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
  categoryId: number;
}
