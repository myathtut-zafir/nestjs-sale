import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDetailDto {
  @IsNumber()
  @IsNotEmpty()
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
