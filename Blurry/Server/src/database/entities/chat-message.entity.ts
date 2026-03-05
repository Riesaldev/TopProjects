import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  contact_id: number;

  @Column()
  sender_id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  timestamp: Date;
}
