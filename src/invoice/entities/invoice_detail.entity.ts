import { Customer } from 'src/customer/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Invoice } from './invoice.entity';
import { Product } from 'src/product/entities/products.entity';

@Entity('invoice_details')
export class InvoiceDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;
  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetail)
  invoice: Invoice;
  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
  @Column({ type: 'date' })
  date: Date;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'int' })
  qty: number;
  @Column({ type: 'int' })
  price: number;
}
