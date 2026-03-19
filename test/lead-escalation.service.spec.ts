import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../src/lead/lead.entity';
import { Dealer } from '../src/dealer/dealer.entity';
import { Conversation } from '../src/conversation/conversation.entity';
import { LeadEscalationService } from '../src/lead/lead-escalation.service';
import { createLead } from './factories/leads';
import { createDealer } from './factories/dealers';

describe('LeadEscalationService', () => {
  let module: TestingModule;
  let service: LeadEscalationService;
  let repo: Repository<Lead>;
  let dealerRepo: Repository<Dealer>;
  let baseDealerId: number;

  beforeAll(async () => {
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
    repo = module.get<Repository<Lead>>(getRepositoryToken(Lead));
    dealerRepo = module.get<Repository<Dealer>>(getRepositoryToken(Dealer));

    const dealer = await dealerRepo.save(createDealer());
    baseDealerId = dealer.id;
  });

  beforeEach(async () => {
    await repo.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  async function persistLead(lead: Lead, createdAt?: Date) {
    lead.dealerId = lead.dealerId ?? baseDealerId;
    const saved = await repo.save(lead);
    if (createdAt) {
      await repo.update({ id: saved.id }, { createdAt });
      saved.createdAt = createdAt;
    }
    return repo.findOneByOrFail({ id: saved.id });
  }

  it('escalates stale uncontacted new leads and returns count', async () => {
    const staleDate = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const lead = await persistLead(createLead({ createdAt: staleDate, priority: 'medium' }), staleDate);

    const count = await service.escalateStaleLeads();
    const updated = await repo.findOneByOrFail({ id: lead.id });

    expect(count).toBe(1);
    expect(updated.priority).toBe('high');
  });

  it('is idempotent when called multiple times', async () => {
    const staleDate = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const lead = await persistLead(createLead({ createdAt: staleDate, priority: 'medium' }), staleDate);

    await service.escalateStaleLeads();
    const secondCount = await service.escalateStaleLeads();
    const updated = await repo.findOneByOrFail({ id: lead.id });

    expect(secondCount).toBe(0);
    expect(updated.priority).toBe('high');
  });

  it('does not escalate when lead was contacted', async () => {
    const staleDate = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const lead = await persistLead(
      createLead({ contactedAt: new Date(), createdAt: staleDate, priority: 'medium' }),
      staleDate,
    );

    const count = await service.escalateStaleLeads();
    const updated = await repo.findOneByOrFail({ id: lead.id });

    expect(count).toBe(0);
    expect(updated.priority).toBe('medium');
  });

  it('does not escalate when lead is younger than 48 hours', async () => {
    const recentDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const lead = await persistLead(createLead({ createdAt: recentDate }), recentDate);

    const count = await service.escalateStaleLeads();
    const updated = await repo.findOneByOrFail({ id: lead.id });

    expect(count).toBe(0);
    expect(updated.priority).toBe('medium');
  });

  it('does not escalate when assigned to a human rep', async () => {
    const staleDate = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const lead = await persistLead(
      createLead({ createdAt: staleDate, assignedTo: 'Julia Bergström' }),
      staleDate,
    );

    const count = await service.escalateStaleLeads();
    const updated = await repo.findOneByOrFail({ id: lead.id });

    expect(count).toBe(0);
    expect(updated.priority).toBe('medium');
  });

  it('escalates when assigned to ai_agent', async () => {
    const staleDate = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const lead = await persistLead(
      createLead({ createdAt: staleDate, assignedTo: 'ai_agent', priority: 'medium' }),
      staleDate,
    );

    const count = await service.escalateStaleLeads();
    const updated = await repo.findOneByOrFail({ id: lead.id });

    expect(count).toBe(1);
    expect(updated.priority).toBe('high');
  });

  it('does not escalate converted or lost leads', async () => {
    const staleDate = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const converted = await persistLead(
      createLead({ createdAt: staleDate, status: 'converted', priority: 'medium' }),
      staleDate,
    );
    const lost = await persistLead(
      createLead({ createdAt: staleDate, status: 'lost', priority: 'medium' }),
      staleDate,
    );

    const count = await service.escalateStaleLeads();
    const updatedConverted = await repo.findOneByOrFail({ id: converted.id });
    const updatedLost = await repo.findOneByOrFail({ id: lost.id });

    expect(count).toBe(0);
    expect(updatedConverted.priority).toBe('medium');
    expect(updatedLost.priority).toBe('medium');
  });
});
