import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ default: 'game' })
  category: string;

  @Column({ nullable: true })
  image_url: string;
}
