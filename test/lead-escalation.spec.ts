import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadEscalationService } from '../src/lead/lead-escalation.service';
import { Lead } from '../src/lead/lead.entity';
import { createLead, createOldUncontactedLead } from './factories/leads';

describe('LeadEscalationService', () => {
  let service: LeadEscalationService;
  let repository: Repository<Lead>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadEscalationService,
        {
          provide: getRepositoryToken(Lead),
          useValue: {
            find: jest.fn(),
            update: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LeadEscalationService>(LeadEscalationService);
    repository = module.get<Repository<Lead>>(getRepositoryToken(Lead));
  });

  describe('escalateStaleLeads', () => {
    it('should escalate old uncontacted leads', async () => {
      // Arrange: Create an old, uncontacted lead
      const oldLead = createOldUncontactedLead();
      oldLead.id = 1;
      oldLead.priority = 'medium';

      jest.spyOn(repository, 'find').mockResolvedValue([oldLead]);
      jest.spyOn(repository, 'update').mockResolvedValue(undefined as any);

      // Act
      const count = await service.escalateStaleLeads();

      // Assert
      expect(count).toBe(1);
      expect(repository.update).toHaveBeenCalledWith([1], { priority: 'high' });
    });

    it('should NOT escalate old contacted leads', async () => {
      // Arrange: Create an old lead that was contacted
      const contactedLead = createLead({
        status: 'new',
        contactedAt: new Date(),
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 72 hours ago
      });

      jest.spyOn(repository, 'find').mockResolvedValue([]); // Query won't return it

      // Act
      const count = await service.escalateStaleLeads();

      // Assert
      expect(count).toBe(0);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should NOT escalate new uncontacted leads less than 48 hours old', async () => {
      // Arrange: Create a recent lead (less than 48 hours)
      const recentLead = createLead({
        status: 'new',
        contactedAt: undefined!,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      });

      jest.spyOn(repository, 'find').mockResolvedValue([]); // Query won't return it

      // Act
      const count = await service.escalateStaleLeads();

      // Assert
      expect(count).toBe(0);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should NOT escalate leads assigned to human salespeople', async () => {
      // Arrange: Create an old lead assigned to a human
      const assignedLead = createLead({
        status: 'new',
        contactedAt: undefined!,
        assignedTo: 'Erik Johansson',
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 72 hours ago
      });
      assignedLead.id = 2;

      jest.spyOn(repository, 'find').mockResolvedValue([assignedLead]);
      jest.spyOn(repository, 'update').mockResolvedValue(undefined as any);

      // Act
      const count = await service.escalateStaleLeads();

      // Assert: Should be filtered out by the service
      expect(count).toBe(0);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should escalate leads assigned to ai_agent', async () => {
      // Arrange: Create an old lead assigned to AI agent
      const aiLead = createLead({
        status: 'new',
        contactedAt: undefined!,
        assignedTo: 'ai_agent',
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 72 hours ago
      });
      aiLead.id = 3;
      aiLead.priority = 'medium';

      jest.spyOn(repository, 'find').mockResolvedValue([aiLead]);
      jest.spyOn(repository, 'update').mockResolvedValue(undefined as any);

      // Act
      const count = await service.escalateStaleLeads();

      // Assert
      expect(count).toBe(1);
      expect(repository.update).toHaveBeenCalledWith([3], { priority: 'high' });
    });

    it('should NOT escalate already converted leads', async () => {
      // Arrange: Create a converted lead
      const convertedLead = createLead({
        status: 'converted',
        contactedAt: undefined!,
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 72 hours ago
      });

      jest.spyOn(repository, 'find').mockResolvedValue([]); // Query filters by status='new'

      // Act
      const count = await service.escalateStaleLeads();

      // Assert
      expect(count).toBe(0);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should NOT escalate lost leads', async () => {
      // Arrange: Create a lost lead
      const lostLead = createLead({
        status: 'lost',
        contactedAt: undefined!,
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 72 hours ago
      });

      jest.spyOn(repository, 'find').mockResolvedValue([]); // Query filters by status='new'

      // Act
      const count = await service.escalateStaleLeads();

      // Assert
      expect(count).toBe(0);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should escalate multiple leads at once', async () => {
      // Arrange: Create multiple old uncontacted leads
      const lead1 = createOldUncontactedLead();
      lead1.id = 10;
      const lead2 = createOldUncontactedLead();
      lead2.id = 11;
      const lead3 = createOldUncontactedLead();
      lead3.id = 12;

      jest.spyOn(repository, 'find').mockResolvedValue([lead1, lead2, lead3]);
      jest.spyOn(repository, 'update').mockResolvedValue(undefined as any);

      // Act
      const count = await service.escalateStaleLeads();

      // Assert
      expect(count).toBe(3);
      expect(repository.update).toHaveBeenCalledWith([10, 11, 12], {
        priority: 'high',
      });
    });

    it('should be idempotent - running twice produces same result', async () => {
      // Arrange: Create an already escalated lead
      const escalatedLead = createOldUncontactedLead();
      escalatedLead.id = 20;
      escalatedLead.priority = 'high'; // Already escalated

      jest.spyOn(repository, 'find').mockResolvedValue([escalatedLead]);
      jest.spyOn(repository, 'update').mockResolvedValue(undefined as any);

      // Act: Run escalation twice
      const count1 = await service.escalateStaleLeads();
      const count2 = await service.escalateStaleLeads();

      // Assert: Both runs should return same count
      expect(count1).toBe(1);
      expect(count2).toBe(1);
      expect(repository.update).toHaveBeenCalledTimes(2);
      expect(repository.update).toHaveBeenCalledWith([20], { priority: 'high' });
    });

    it('should handle empty result set', async () => {
      // Arrange: No stale leads
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      // Act
      const count = await service.escalateStaleLeads();

      // Assert
      expect(count).toBe(0);
      expect(repository.update).not.toHaveBeenCalled();
    });
  });
});
