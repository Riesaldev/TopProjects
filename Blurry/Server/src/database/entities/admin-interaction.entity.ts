import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('admin_interactions')
export class AdminInteraction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender_id: number;

  @Column()
  receiver_id: number;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;
} 