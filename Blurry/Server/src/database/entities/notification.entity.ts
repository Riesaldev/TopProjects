import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  match_id: number;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  type: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;
} 