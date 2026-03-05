import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('streaks')
export class Streak {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_id: number;

  @Column({ default: 0 })
  current_streak: number;

  @Column({ default: 0 })
  max_streak: number;

  @Column({ type: 'varchar', length: 16, nullable: true })
  last_activity: string;
}
