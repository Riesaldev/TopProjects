import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('games')
@Unique('UQ_games_name_category', ['name', 'category'])
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ default: 'game' })
  category: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ nullable: true })
  image_url: string;
}
