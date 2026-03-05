import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  contact_id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  date: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
