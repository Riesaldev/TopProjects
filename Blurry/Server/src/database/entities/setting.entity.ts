import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column({ nullable: true })
  updated_by: string;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
} 