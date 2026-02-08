import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_a_id: number;

  @Column()
  user_b_id: number;

  @Column({ nullable: true })
  score: number;

  @Column()
  status: string;

  @CreateDateColumn()
  match_date: Date;
} 