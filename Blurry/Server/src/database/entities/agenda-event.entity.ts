import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('agenda_events')
export class AgendaEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('datetime')
  datetime: Date;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  contact_id: number;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
