# Exercise: Lead Priority Escalation (BDD/TDD)

Use this as a prompt to Claude Code with `/implement` or paste directly.

---

## Feature: Lead Priority Escalation

A lead that has been in "new" status for more than 48 hours without being
contacted should automatically be escalated to "high" priority.

### Expected behavior
- When a lead is created, priority defaults to "medium"
- If 48 hours pass and contactedAt is still null, priority becomes "high"
- Only leads with status "new" are affected
- Leads already assigned to a salesperson are never escalated
- Leads assigned to "ai_agent" ARE escalated (agent should have responded by now)

### Acceptance criteria
- Create `src/lead/lead-escalation.service.ts`
- Add method `escalateStaleLeads(): Promise<number>` (returns count of escalated)
- Jest tests cover:
  - old + uncontacted → escalated
  - old + contacted → NOT escalated
  - new + uncontacted but < 48h → NOT escalated
  - old + assigned to human → NOT escalated
  - old + assigned to ai_agent → escalated
  - already converted → NOT escalated
- Use factory functions from `test/factories/leads.ts`

### How to run
```bash
cd demo-project
claude
> /implement lead priority escalation
```

Or paste the "Feature" section above directly into Claude Code.
