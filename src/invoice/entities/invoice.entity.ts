import { Customer } from 'src/customer/entities/customer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceDetail } from './invoice_detail.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;
  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.invoice)
  invoiceDetail: InvoiceDetail[];
  @ManyToOne(() => User, (user) => user.invoices)
  user: User;
  @Column({ type: 'date' })
  date: Date;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'int' })
  total: number;
  @Column({ type: 'int' })
  advance_amount: number;
}
