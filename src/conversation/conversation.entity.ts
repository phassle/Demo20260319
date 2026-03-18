import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lead } from '../lead/lead.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lead, (lead) => lead.conversations)
  @JoinColumn({ name: 'lead_id' })
  lead: Lead;

  @Column({ name: 'lead_id' })
  leadId: number;

  @Column({ default: 'phone' })
  channel: string; // phone, whatsapp, form, email

  @Column({ default: 'inbound' })
  direction: string; // inbound, outbound

  @Column({ name: 'duration_seconds', nullable: true })
  durationSeconds: number;

  @Column({ nullable: true })
  transcript: string;

  @Column({ default: 'pending' })
  outcome: string; // pending, qualified, engaged, dropped

  @Column({ name: 'handled_by', default: 'human' })
  handledBy: string; // human, ai_agent

  @Column({ name: 'intent_score', nullable: true, type: 'float' })
  intentScore: number; // 0.00 - 1.00, AI-assessed buying intent

  @CreateDateColumn()
  createdAt: Date;
}
