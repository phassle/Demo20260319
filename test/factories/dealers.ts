import { Dealer } from '../../src/dealer/dealer.entity';

export function createDealer(overrides: Partial<Dealer> = {}): Dealer {
  const dealer = new Dealer();
  dealer.name = overrides.name ?? 'Bil-Nilsson AB';
  dealer.email = overrides.email ?? 'info@bilnilsson.se';
  dealer.phone = overrides.phone ?? '+46184567890';
  dealer.city = overrides.city ?? 'Uppsala';
  dealer.country = overrides.country ?? 'SE';
  dealer.status = overrides.status ?? 'active';
  dealer.marketplaceId = overrides.marketplaceId ?? 'blocket';
  return dealer;
}
