import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/product/entities/products.entity';
import { IsExist } from 'src/validation/is-exist.validator';

export class CreateInvoiceDetailDto {
  @IsNumber()
  @IsNotEmpty()
  @IsExist(Product)
  productId: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
