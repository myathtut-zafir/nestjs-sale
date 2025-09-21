import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Product } from 'src/product/entities/products.entity';

@Entity('invoice_details')
export class InvoiceDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetail)
  invoice: Invoice;
  @ManyToOne(() => Product, (product) => product.invoiceDetails)
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
