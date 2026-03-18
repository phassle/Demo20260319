import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Lead } from '../lead/lead.entity';

@Entity('dealers')
export class Dealer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  country: string;

  @Column({ default: 'active' })
  status: string; // active, inactive, suspended

  @Column({ name: 'marketplace_id', nullable: true })
  marketplaceId: string; // e.g. "mobile_de", "leboncoin", "blocket"

  @OneToMany(() => Lead, (lead) => lead.dealer)
  leads: Lead[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
