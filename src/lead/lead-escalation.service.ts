import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, LessThan } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadEscalationService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  /**
   * Escalate stale leads to high priority.
   *
   * Escalation criteria:
   * - Status is "new"
   * - contactedAt is null (not contacted yet)
   * - Created more than 48 hours ago
   * - NOT assigned to a human salesperson (assignedTo is null or "ai_agent")
   * - NOT already converted or lost
   *
   * @returns Promise<number> - Count of escalated leads
   */
  async escalateStaleLeads(): Promise<number> {
    const fortyEightHoursAgo = new Date();
    fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

    // Find leads that need escalation
    const staleLeads = await this.leadRepository.find({
      where: {
        status: 'new',
        contactedAt: IsNull(),
        createdAt: LessThan(fortyEightHoursAgo),
      },
    });

    // Filter out leads assigned to human salespeople
    // Only escalate unassigned leads or leads assigned to "ai_agent"
    const leadsToEscalate = staleLeads.filter(
      (lead) => !lead.assignedTo || lead.assignedTo === 'ai_agent',
    );

    // Update priority to "high" for all matching leads
    if (leadsToEscalate.length > 0) {
      await this.leadRepository.update(
        leadsToEscalate.map((lead) => lead.id),
        { priority: 'high' },
      );
    }

    return leadsToEscalate.length;
  }
}
