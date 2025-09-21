import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateInvoiceDetailDto } from './create-invoice-detail.dto';
import { IsExist } from 'src/validation/is-exist.validator';
import { Customer } from 'src/customer/entities/customer.entity';

export class CreateInvoiceDto {
  @IsNumber()
  @IsNotEmpty()
  @IsExist(Customer)
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDetailDto)
  invoiceDetail: CreateInvoiceDetailDto[];

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  advance_amount: number;
}
