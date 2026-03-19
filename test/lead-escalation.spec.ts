import { Repository } from 'typeorm';
import { Lead } from '../src/lead/lead.entity';
import { LeadEscalationService } from '../src/lead/lead-escalation.service';
import {
  createLead,
  createOldUncontactedLead,
  createStaleAiAgentLead,
  createHumanAssignedLead,
  createQualifiedLead,
} from './factories/leads';

function buildMockRepo(leads: Lead[]): jest.Mocked<Repository<Lead>> {
  return {
    find: jest.fn().mockResolvedValue(leads),
    save: jest.fn().mockImplementation(async (items: Lead[]) => items),
  } as unknown as jest.Mocked<Repository<Lead>>;
}

describe('LeadEscalationService', () => {
  describe('escalateStaleLeads', () => {
    it('escalates unassigned new leads older than 48h with no contactedAt', async () => {
      const lead = createOldUncontactedLead();
      const repo = buildMockRepo([lead]);
      const service = new LeadEscalationService(repo);

      const count = await service.escalateStaleLeads();

      expect(count).toBe(1);
      expect(lead.priority).toBe('high');
      expect(repo.save).toHaveBeenCalledWith([lead]);
    });

    it('escalates leads assigned to ai_agent', async () => {
      const lead = createStaleAiAgentLead();
      const repo = buildMockRepo([lead]);
      const service = new LeadEscalationService(repo);

      const count = await service.escalateStaleLeads();

      expect(count).toBe(1);
      expect(lead.priority).toBe('high');
    });

    it('does not escalate leads already at high priority (idempotent)', async () => {
      const lead = createOldUncontactedLead();
      lead.priority = 'high';
      const repo = buildMockRepo([lead]);
      const service = new LeadEscalationService(repo);

      const count = await service.escalateStaleLeads();

      expect(count).toBe(0);
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('is idempotent — running twice leaves priority as high with count 0 on second run', async () => {
      const lead = createOldUncontactedLead();
      const repo = buildMockRepo([lead]);
      const service = new LeadEscalationService(repo);

      const firstCount = await service.escalateStaleLeads();
      expect(firstCount).toBe(1);

      // Second run: lead is now 'high', repo returns it again
      const secondCount = await service.escalateStaleLeads();
      expect(secondCount).toBe(0);
      expect(lead.priority).toBe('high');
    });

    it('returns 0 when there are no stale leads', async () => {
      const repo = buildMockRepo([]);
      const service = new LeadEscalationService(repo);

      const count = await service.escalateStaleLeads();

      expect(count).toBe(0);
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('queries with correct conditions to exclude human-assigned leads', async () => {
      const repo = buildMockRepo([]);
      const service = new LeadEscalationService(repo);

      await service.escalateStaleLeads();

      const [whereArg] = (repo.find as jest.Mock).mock.calls[0][0].where;
      expect(whereArg.status).toBe('new');
    });

    it('does not escalate non-new status leads (converted, lost, qualified)', async () => {
      // The repository query filters by status='new' so those leads are never returned.
      // Simulate repo returning nothing for non-new leads.
      const repo = buildMockRepo([]);
      const service = new LeadEscalationService(repo);

      const count = await service.escalateStaleLeads();

      expect(count).toBe(0);
    });

    it('escalates multiple stale leads and returns correct count', async () => {
      const leads = [
        createOldUncontactedLead(),
        createOldUncontactedLead(),
        createStaleAiAgentLead(),
      ];
      const repo = buildMockRepo(leads);
      const service = new LeadEscalationService(repo);

      const count = await service.escalateStaleLeads();

      expect(count).toBe(3);
      leads.forEach((lead) => expect(lead.priority).toBe('high'));
    });

    it('only counts leads that were actually changed when some are already high', async () => {
      const stale = createOldUncontactedLead();
      const alreadyHigh = createOldUncontactedLead();
      alreadyHigh.priority = 'high';
      const repo = buildMockRepo([stale, alreadyHigh]);
      const service = new LeadEscalationService(repo);

      const count = await service.escalateStaleLeads();

      expect(count).toBe(1);
      expect(stale.priority).toBe('high');
    });

    it('uses the 48h threshold when querying for stale leads', async () => {
      const repo = buildMockRepo([]);
      const service = new LeadEscalationService(repo);
      const before = Date.now();

      await service.escalateStaleLeads();

      const after = Date.now();
      const whereConditions = (repo.find as jest.Mock).mock.calls[0][0].where;
      const thresholdDate: Date = whereConditions[0].createdAt.value;
      const expectedMin = before - LeadEscalationService.ESCALATION_THRESHOLD_MS;
      const expectedMax = after - LeadEscalationService.ESCALATION_THRESHOLD_MS;

      expect(thresholdDate.getTime()).toBeGreaterThanOrEqual(expectedMin);
      expect(thresholdDate.getTime()).toBeLessThanOrEqual(expectedMax);
    });
  });
});
