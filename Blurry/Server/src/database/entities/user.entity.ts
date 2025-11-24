import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @Column({ default: 'user' })
  role!: string;

  @Column({ unique: true })
  display_name!: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  location?: string;

  @Column('json', { nullable: true })
  values_profile?: any;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  interests?: string;

  @Column({ nullable: true })
  imagen_perfil?: string;

  @Column({ default: 0 })
  tokens?: number;

  @Column({ default: false })
  is_suspended!: boolean;

  @Column({ nullable: true })
  suspension_reason?: string;

  @Column({ nullable: true })
  suspension_until?: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}