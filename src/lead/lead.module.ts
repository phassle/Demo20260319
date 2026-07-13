import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { LeadController } from './lead.controller';
import { LeadEscalationService } from './lead-escalation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  controllers: [LeadController],
  providers: [LeadEscalationService],
  exports: [TypeOrmModule, LeadEscalationService],
})
export class LeadModule {}
