import { Role } from 'src/iam/entities/role.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Product } from 'src/product/entities/products.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
