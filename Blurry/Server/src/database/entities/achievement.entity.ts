import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0 })
  token_reward: number;

  @Column({ default: false })
  secret: boolean;
}
