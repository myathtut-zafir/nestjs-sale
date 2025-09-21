import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceDetail } from './entities/invoice_detail.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, InvoiceDetail]),
    CustomerModule,
    UserModule,
  ],
})
export class InvoiceModule {}
