import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

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
}
