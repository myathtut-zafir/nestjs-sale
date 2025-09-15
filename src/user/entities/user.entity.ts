import { Role } from 'src/iam/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
