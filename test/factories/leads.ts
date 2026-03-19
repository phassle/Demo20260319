import { Lead } from '../../src/lead/lead.entity';

export function createLead(overrides: Partial<Lead> = {}): Lead {
  const lead = new Lead();
  lead.customerName = overrides.customerName ?? 'Test Customer';
  lead.customerEmail = overrides.customerEmail ?? 'test@example.com';
  lead.customerPhone = overrides.customerPhone ?? '+46701234567';
  lead.status = overrides.status ?? 'new';
  lead.priority = overrides.priority ?? 'medium';
  lead.source = overrides.source ?? 'mobile_de';
  lead.vehicleInfo = overrides.vehicleInfo ?? '2024 BMW X3, €45,000';
  lead.dealerId = overrides.dealerId ?? 1;
  lead.assignedTo = overrides.assignedTo ?? undefined!;
  lead.createdAt = overrides.createdAt ?? new Date();
  // allow explicit test control
  if (overrides.contactedAt !== undefined) {
    lead.contactedAt = overrides.contactedAt;
  }
  if (overrides.qualifiedAt !== undefined) {
    lead.qualifiedAt = overrides.qualifiedAt;
  }
  return lead;
}

export function createOldUncontactedLead(): Lead {
  const lead = createLead({
    status: 'new',
    assignedTo: undefined!,
    contactedAt: undefined!,
  });
  lead.createdAt = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000); // 20 days ago
  return lead;
}

export function createQualifiedLead(): Lead {
  return createLead({
    status: 'qualified',
    priority: 'high',
    assignedTo: 'Erik Johansson',
    contactedAt: new Date(),
    qualifiedAt: new Date(),
  });
}
