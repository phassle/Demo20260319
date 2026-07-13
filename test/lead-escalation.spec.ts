import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../src/lead/lead.entity';
import { Dealer } from '../src/dealer/dealer.entity';
import { Conversation } from '../src/conversation/conversation.entity';
import { LeadEscalationService } from '../src/lead/lead-escalation.service';
import { createLead, createOldUncontactedLead } from './factories/leads';
import { createDealer } from './factories/dealers';

describe('LeadEscalationService', () => {
  let service: LeadEscalationService;
  let leadRepo: Repository<Lead>;
  let dealerRepo: Repository<Dealer>;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          entities: [Lead, Dealer, Conversation],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Lead, Dealer]),
      ],
      providers: [LeadEscalationService],
    }).compile();

    service = module.get(LeadEscalationService);
    leadRepo = module.get('LeadRepository');
    dealerRepo = module.get('DealerRepository');

    // Seed a dealer for foreign key
    const dealer = createDealer();
    await dealerRepo.save(dealer);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should escalate old uncontacted lead to high priority', async () => {
    const lead = createOldUncontactedLead();
    await leadRepo.save(lead);

    const count = await service.escalateStaleLeads();

    expect(count).toBe(1);
    const updated = await leadRepo.findOneBy({ id: lead.id });
    expect(updated!.priority).toBe('high');
  });

  it('should NOT escalate old contacted lead', async () => {
    const lead = createOldUncontactedLead();
    lead.contactedAt = new Date();
    await leadRepo.save(lead);

    const count = await service.escalateStaleLeads();

    expect(count).toBe(0);
    const updated = await leadRepo.findOneBy({ id: lead.id });
    expect(updated!.priority).toBe('medium');
  });

  it('should NOT escalate recent uncontacted lead', async () => {
    const lead = createLead({ status: 'new', contactedAt: undefined });
    lead.createdAt = new Date(); // just created
    await leadRepo.save(lead);

    const count = await service.escalateStaleLeads();

    expect(count).toBe(0);
    const updated = await leadRepo.findOneBy({ id: lead.id });
    expect(updated!.priority).toBe('medium');
  });

  it('should NOT escalate lead assigned to human rep', async () => {
    const lead = createOldUncontactedLead();
    lead.assignedTo = 'Erik Johansson';
    await leadRepo.save(lead);

    const count = await service.escalateStaleLeads();

    expect(count).toBe(0);
    const updated = await leadRepo.findOneBy({ id: lead.id });
    expect(updated!.priority).toBe('medium');
  });

  it('should escalate lead assigned to ai_agent', async () => {
    const lead = createOldUncontactedLead();
    lead.assignedTo = 'ai_agent';
    await leadRepo.save(lead);

    const count = await service.escalateStaleLeads();

    expect(count).toBe(1);
    const updated = await leadRepo.findOneBy({ id: lead.id });
    expect(updated!.priority).toBe('high');
  });

  it('should NOT escalate converted or lost leads', async () => {
    const converted = createOldUncontactedLead();
    converted.status = 'converted';
    await leadRepo.save(converted);

    const lost = createOldUncontactedLead();
    lost.status = 'lost';
    await leadRepo.save(lost);

    const count = await service.escalateStaleLeads();

    expect(count).toBe(0);
  });

  it('should be idempotent — running twice produces same result', async () => {
    const lead = createOldUncontactedLead();
    await leadRepo.save(lead);

    const firstCount = await service.escalateStaleLeads();
    expect(firstCount).toBe(1);

    const secondCount = await service.escalateStaleLeads();
    expect(secondCount).toBe(0);

    const updated = await leadRepo.findOneBy({ id: lead.id });
    expect(updated!.priority).toBe('high');
  });
});
