import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('services_status')
export class ServiceStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: 'Activo' })
  estado: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @UpdateDateColumn()
  updated_at: Date;
}
