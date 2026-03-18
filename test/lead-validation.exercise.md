# Exercise: Lead Validation (Bug Fix)

Simple bug fix exercise — good first task for Claude Code.

---

## Bug Report (from Jira KAI-789)

**Title:** Leads created without phone number — partners can't follow up

**Description:**
Partners (Eventeye, KS Møteplasser) report that leads are arriving without
phone numbers. This makes it impossible for dealers to follow up by phone,
which is the primary contact method for car buyers.

**Steps to reproduce:**
1. POST /api/v1/leads with `{ customerName: "Test", dealerId: 1 }`
2. Lead is created successfully — no phone validation
3. Dealer receives lead without phone → can't call → lead lost

**Expected:**
- `customerPhone` should be required
- Phone format should match E.164: `+[country][number]` (e.g. +46701234567)
- API should return 422 with validation error if missing or invalid

### How to run
```bash
cd demo-project
claude
> "Bug: Creating a lead without a phone number should fail validation
   but currently saves. Fix it with tests."
```
