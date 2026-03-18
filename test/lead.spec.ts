import { Lead } from '../src/lead/lead.entity';

describe('Lead', () => {
  describe('entity fields', () => {
    it('should have required fields', () => {
      const lead = new Lead();
      lead.customerName = 'Anna Svensson';
      lead.customerEmail = 'anna@example.com';
      lead.customerPhone = '+46701234567';
      lead.status = 'new';
      lead.priority = 'medium';
      lead.dealerId = 1;

      expect(lead.customerName).toBe('Anna Svensson');
      expect(lead.status).toBe('new');
      expect(lead.priority).toBe('medium');
    });

    it('should accept valid statuses', () => {
      const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
      validStatuses.forEach((status) => {
        const lead = new Lead();
        lead.status = status;
        expect(lead.status).toBe(status);
      });
    });

    it('should accept valid priorities', () => {
      const validPriorities = ['low', 'medium', 'high', 'urgent'];
      validPriorities.forEach((priority) => {
        const lead = new Lead();
        lead.priority = priority;
        expect(lead.priority).toBe(priority);
      });
    });
  });

  // NOTE: Missing tests for:
  // - Phone number validation (required for lead follow-up)
  // - Lead scoring/escalation (old uncontacted leads should become high priority)
  // - Source validation (must be one of: mobile_de, leboncoin, blocket, direct, whatsapp)
});
