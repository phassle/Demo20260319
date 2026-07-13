import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadEscalationService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async escalateStaleLeads(): Promise<number> {
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const result = await this.leadRepository
      .createQueryBuilder()
      .update(Lead)
      .set({ priority: 'high' })
      .where('status = :status', { status: 'new' })
      .andWhere('priority NOT IN (:...excludedPriorities)', {
        excludedPriorities: ['high', 'urgent'],
      })
      .andWhere('"contacted_at" IS NULL')
      .andWhere('"createdAt" < :cutoff', { cutoff })
      .andWhere('("assigned_to" IS NULL OR "assigned_to" = :aiAgent)', {
        aiAgent: 'ai_agent',
      })
      .execute();

    return result.affected ?? 0;
  }
}
