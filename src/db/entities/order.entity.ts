import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'customer' })
  customer!: string;

  @Column({ name: 'category' })
  category!: string;

  @Column({ name: 'product' })
  product!: string;

  @Column({ name: 'quantity' })
  quantity!: number;

  @Column({ name: 'status' })
  status!: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'NOW()' })
  createdAt!: Date;
}
