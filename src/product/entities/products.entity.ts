import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
