import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadModule } from './lead/lead.module';
import { Lead } from './lead/lead.entity';
import { Dealer } from './dealer/dealer.entity';
import { Conversation } from './conversation/conversation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [Lead, Dealer, Conversation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Dealer]),
    LeadModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(Dealer)
    private readonly dealerRepo: Repository<Dealer>,
  ) {}

  async onModuleInit() {
    const count = await this.dealerRepo.count();
    if (count === 0) {
      await this.dealerRepo.save([
        { name: 'AutoHaus Berlin', email: 'info@autohaus-berlin.de', phone: '+49301234567', city: 'Berlin', country: 'Germany', marketplaceId: 'mobile_de' },
        { name: 'Bilhuset Stockholm', email: 'info@bilhuset.se', phone: '+46812345678', city: 'Stockholm', country: 'Sweden', marketplaceId: 'blocket' },
      ]);
      console.log('Seeded 2 dealers');
    }
  }
}
