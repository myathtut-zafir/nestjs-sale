import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  display_name: string;
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
