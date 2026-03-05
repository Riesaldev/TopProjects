import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('text')
  description: string;

  @Column({ default: 1 })
  goal: number;

  @Column()
  action: string;

  @Column({ default: 0 })
  reward_tokens: number;

  @Column({ default: false })
  secret: boolean;
}
