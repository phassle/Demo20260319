// NOTE: No validation decorators! This DTO doesn't actually validate anything.
// Exercise: Add class-validator decorators (@IsNotEmpty, @IsPhoneNumber, etc.)

export class CreateLeadDto {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;  // BUG: should be required + validated
  dealerId: number;
  source?: string;
  listingId?: string;
  vehicleInfo?: string;
}
