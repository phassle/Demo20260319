import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Dealer } from '../dealer/dealer.entity';
import { Conversation } from '../conversation/conversation.entity';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_name', nullable: false })
  customerName: string;

  @Column({ name: 'customer_email', nullable: true })
  customerEmail: string;

  @Column({ name: 'customer_phone', nullable: true })
  customerPhone: string;
  // BUG: phone validation is missing!
  // Partners complain leads are created without phone numbers,
  // making it impossible to follow up.

  @Column({ default: 'new' })
  status: string; // new, contacted, qualified, converted, lost

  @Column({ default: 'medium' })
  priority: string; // low, medium, high, urgent

  @Column({ nullable: true })
  source: string; // mobile_de, leboncoin, blocket, direct, whatsapp

  @Column({ name: 'listing_id', nullable: true })
  listingId: string; // reference to the car listing

  @Column({ name: 'vehicle_info', nullable: true })
  vehicleInfo: string; // "2024 BMW X3, €45,000"

  @ManyToOne(() => Dealer, (dealer) => dealer.leads)
  @JoinColumn({ name: 'dealer_id' })
  dealer: Dealer;

  @Column({ name: 'dealer_id' })
  dealerId: number;

  @Column({ name: 'assigned_to', nullable: true })
  assignedTo: string; // salesperson name or "ai_agent"

  @OneToMany(() => Conversation, (conv) => conv.lead)
  conversations: Conversation[];

  @Column({ name: 'contacted_at', nullable: true })
  contactedAt: Date;

  @Column({ name: 'qualified_at', nullable: true })
  qualifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
