import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';

@Controller('api/v1/leads')
export class LeadController {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  @Get()
  async findAll(@Query('dealerId') dealerId?: string) {
    // NOTE: This has an N+1 query problem — no relations loaded
    const leads = dealerId
      ? await this.leadRepository.find({ where: { dealerId: Number(dealerId) } })
      : await this.leadRepository.find();

    // NOTE: Accessing dealer.name will trigger N+1 queries
    return leads.map((lead) => ({
      id: lead.id,
      customerName: lead.customerName,
      customerPhone: lead.customerPhone,
      status: lead.status,
      priority: lead.priority,
      source: lead.source,
      vehicleInfo: lead.vehicleInfo,
      dealer: lead.dealer?.name, // N+1!
      assignedTo: lead.assignedTo,
      createdAt: lead.createdAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.leadRepository.findOne({
      where: { id: Number(id) },
      relations: ['dealer', 'conversations'],
    });
  }

  @Post()
  async create(@Body() body: any) {
    // NOTE: No DTO validation!
    // NOTE: No auth guard!
    // NOTE: Business logic in controller — should be in service
    const lead = this.leadRepository.create(body);
    return this.leadRepository.save(lead);
  }
}
