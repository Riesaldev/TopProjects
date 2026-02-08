import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  action: string;

  @Column('json', { nullable: true })
  metadata: any;

  @CreateDateColumn()
  created_at: Date;
} 