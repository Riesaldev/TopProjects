import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  match_id: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;
} 