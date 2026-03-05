import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_missions')
export class UserMission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  mission_id: number;

  @Column({ default: 0 })
  progress: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'varchar', length: 32 })
  assigned_at: string;

  @Column({ type: 'datetime', nullable: true })
  completed_at: Date;
}
