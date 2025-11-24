import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reported_user_id: number;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  admin_notes: string;

  @CreateDateColumn()
  created_at: Date;
} 