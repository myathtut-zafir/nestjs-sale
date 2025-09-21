import { Category } from 'src/category/entities/category.entity';
import { InvoiceDetail } from 'src/invoice/entities/invoice_detail.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  brand: string;
  @Column({ type: 'varchar' })
  sex: string;
  @Column({ type: 'varchar' })
  model: string;
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
  @OneToOne(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.product)
  invoiceDetail: InvoiceDetail;
}
