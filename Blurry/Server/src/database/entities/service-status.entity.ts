import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('services_status')
export class ServiceStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: 'Activo' })
  estado: string;

  @UpdateDateColumn()
  updated_at: Date;
}
