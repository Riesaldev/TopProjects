import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sanctions')
export class Sanction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  usuario: string;

  @Column()
  sancion: string;

  @Column({ default: 'Activa' })
  estado: string;

  @CreateDateColumn()
  fecha: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
