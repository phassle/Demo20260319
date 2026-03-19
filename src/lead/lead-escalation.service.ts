import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, IsNull } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadEscalationService {
  static readonly ESCALATION_THRESHOLD_MS = 48 * 60 * 60 * 1000;

  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async escalateStaleLeads(): Promise<number> {
    const threshold = new Date(
      Date.now() - LeadEscalationService.ESCALATION_THRESHOLD_MS,
    );

    // Find stale leads: status "new", never contacted, older than 48h,
    // and not assigned to a human salesperson.
    const staleLeads = await this.leadRepository.find({
      where: [
        // Unassigned leads
        {
          status: 'new',
          contactedAt: IsNull(),
          createdAt: LessThan(threshold),
          assignedTo: IsNull(),
        },
        // AI-agent-assigned leads
        {
          status: 'new',
          contactedAt: IsNull(),
          createdAt: LessThan(threshold),
          assignedTo: 'ai_agent',
        },
      ],
    });

    // Only count leads whose priority actually changes (idempotency).
    const toEscalate = staleLeads.filter((lead) => lead.priority !== 'high');

    if (toEscalate.length === 0) {
      return 0;
    }

    for (const lead of toEscalate) {
      lead.priority = 'high';
    }

    await this.leadRepository.save(toEscalate);
    return toEscalate.length;
  }
}
