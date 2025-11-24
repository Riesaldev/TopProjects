import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reports_generated')
export class ReportGenerated {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  generated_by: string;

  @Column()
  type: string;

  @Column()
  start_date: Date;

  @Column({ nullable: true })
  upupdate: Date;
} 