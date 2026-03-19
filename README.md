# InfuseAI Workshop Demo Project

A minimal Nest.js lead management API for hands-on AI workshop exercises.

## Quick start

```bash
git clone https://github.com/phassle/Demo20260319.git
cd Demo20260319
npm install
npx nest start
# App runs on http://localhost:3333 with SQLite in-memory DB
```

## Commands

```bash
npx nest start          # Start dev server
npx nest start --watch  # Start with hot reload
npx jest                # Run tests
npx jest --watch        # Run tests in watch mode
```

## Tech stack
- Nest.js 10 + TypeScript
- SQLite in-memory (via better-sqlite3) — no DB setup needed
- TypeORM entities
- Jest for testing
- class-validator for DTO validation (not yet used — that's an exercise!)

## Domain

InfuseAI is a lead management & conversation intelligence platform for automotive marketplaces.
- **Leads** — customer inquiries from marketplace listings
- **Dealers** — car dealerships receiving leads
- **Conversations** — phone calls and messages between customers and dealers

## API endpoints

```bash
# List all leads
curl http://localhost:3333/api/v1/leads

# Get a specific lead
curl http://localhost:3333/api/v1/leads/1

# Create a lead
curl -X POST http://localhost:3333/api/v1/leads \
  -H 'Content-Type: application/json' \
  -d '{
    "customerName": "Anna Svensson",
    "customerEmail": "anna@test.se",
    "customerPhone": "+46701234567",
    "source": "blocket",
    "vehicleInfo": "2024 Volvo XC60, 450000 kr",
    "dealerId": 2
  }'

# Filter leads by dealer
curl http://localhost:3333/api/v1/leads?dealerId=1
```

## Seeded data

Two dealers are created automatically at startup:

| ID | Name | City | Marketplace |
|----|------|------|-------------|
| 1 | AutoHaus Berlin | Berlin | mobile_de |
| 2 | Bilhuset Stockholm | Stockholm | blocket |

---

## Intentional issues (for workshop exercises)

This project has **6 intentional bugs/gaps** — perfect for practicing with Claude Code:

1. **Missing validation** — Leads can be created without phone numbers
2. **N+1 query** — `findAll` loads dealer relation one by one
3. **No auth guard** — create endpoint has no access control
4. **No service layer** — business logic lives in controller
5. **No lead escalation** — old uncontacted leads stay at "new" status
6. **No DTO validation** — create endpoint accepts raw body without validation

---

## Workshop exercises

### Exercise 1: Onboard your AI colleague — Write AGENTS.md

> **Start here!** Without AGENTS.md, the agent guesses your stack, patterns, and conventions. This is the single most important step.

**Copy-paste into Claude Code:**

```
Analyze this codebase and create an AGENTS.md file:
1. Keep it under 150 lines
2. Cover: WHAT (tech stack), WHY (purpose), HOW (commands)
3. Progressive Disclosure: index pointing to docs/ files
4. file:line references instead of code snippets
5. Assume linters handle code style
6. Always include these two lines:
   - Be extremely concise. Sacrifice grammar for concision.
   - At the end of each plan, list unresolved questions.

Extract patterns into docs/architectural_patterns.md
Finally: ln -s AGENTS.md CLAUDE.md
```

### Exercise 2: Bug fix — Missing phone validation

**Copy-paste into Claude Code:**

```
Bug: Creating a lead without a phone number should fail validation
but currently saves successfully.

POST /api/v1/leads with { "customerName": "Test", "dealerId": 1 }
creates a lead without a phone — dealers can't follow up.

Fix it:
- customerPhone should be required
- Phone format should match E.164: +[country][number] (e.g. +46701234567)
- API should return 422 with validation error if missing or invalid
- Add tests
```

### Exercise 3: BDD/TDD — Lead priority escalation

**Copy-paste into Claude Code:**

```
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
- Create src/lead/lead-escalation.service.ts
- Add method escalateStaleLeads(): Promise<number> (returns count of escalated)
- Jest tests cover:
  - old + uncontacted → escalated
  - old + contacted → NOT escalated
  - new + uncontacted but < 48h → NOT escalated
  - old + assigned to human → NOT escalated
  - old + assigned to ai_agent → escalated
  - already converted → NOT escalated
- Use factory functions from test/factories/leads.ts
```

Or use the `/implement` skill:
```
/implement lead priority escalation
```

### Exercise 4: Plan mode — Extract service layer

**Press Shift+Tab x2 for plan mode, then paste:**

```
The LeadController has business logic that should be in a service.
Extract a LeadService that handles:
- Finding leads with proper relation loading (fix N+1)
- Creating leads with DTO validation
- Filtering by dealerId

Keep the controller thin — it should only handle HTTP concerns.
Ask me questions before starting.
```

### Exercise 4b: Plan mode — Soft delete

**Press Shift+Tab x2 for plan mode, then paste:**

```
Add soft delete to the Lead model
```

**What Claude will do (example plan output):**

```
Planning:
1. Read src/lead/lead.entity.ts + migration files
2. Generate migration: add deleted_at column
3. Add @DeleteDateColumn() decorator
4. Update LeadService to use softRemove/recover
5. Update existing queries with withDeleted option
6. Add tests
Proceed?

> yes -> implements -> OK all tests pass
```

**Why this is a good exercise:**
- Shows how plan mode investigates before acting
- She reads existing code to match the project's patterns
- You review the plan and can iterate before she writes a single line

### Exercise 5: Multi-agent — Parallel worktrees

**Run in separate terminals:**

```bash
# Terminal 1: Fix the N+1 query
claude -w feature/fix-n-plus-one \
  "Fix the N+1 query in LeadController.findAll — load dealer relation properly"

# Terminal 2: Add auth guard
claude -w feature/auth-guard \
  "Add a simple API key guard to POST /api/v1/leads.
   Key comes from x-api-key header. Store expected key in env var API_KEY."

# Terminal 3: Add lead search
claude -w feature/lead-search \
  "Add GET /api/v1/leads/search?q=query that searches across
   customerName, customerEmail, and vehicleInfo fields"
```

### Exercise 6: Create a /review skill

**Create the file `.claude/skills/review/SKILL.md`:**

```yaml
---
name: review
description: Reviews NestJS + TypeORM code for common issues
allowed-tools: Read, Grep, Glob
---

Review $ARGUMENTS:

## NestJS
1. Business logic in controller? Should be in service?
2. Missing DTO validation on endpoints?
3. Missing auth guards?
4. Raw SQL without parameterization?

## TypeORM
5. N+1 queries? Missing relations in find()?
6. Missing indexes on frequently queried columns?
7. Nullable columns that should be required?

## Testing
8. Jest specs exist for all new code?
9. Factory functions used for test data?
10. Edge cases covered?

## Output
Summarize: pass / warning / must fix
```

**Then test it:**
```
/review src/lead/lead.controller.ts
```

### Exercise 7: Add a Stop hook

**Copy-paste into Claude Code:**

```
Add a Stop hook to .claude/settings.json that runs
"npx jest" automatically whenever you finish a task.
```

Or create it manually in `.claude/settings.json`:
```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "command": "npx jest",
        "timeout": 60
      }]
    }]
  }
}
```

---

## Useful Claude Code commands

| Command | What it does |
|---------|-------------|
| `Shift+Tab` | Toggle: Normal → Auto-accept → Plan mode |
| `/clear` | Clear conversation (fresh context) |
| `/context` | Show context window usage |
| `/compact` | Compress context, keep summary |
| `/cost` | Show token costs |
| `Ctrl+C` | Cancel current generation |
| `claude -c` | Resume last conversation |
| `Esc + Esc` | Rewind last action |
| `claude -w branch-name` | Work in isolated git worktree |

---

## Architecture

```
src/
├── lead/              ← Lead entity, controller, module, DTOs
│   ├── dto/           ← CreateLeadDto (needs validation decorators!)
│   ├── lead.entity.ts
│   ├── lead.controller.ts
│   └── lead.module.ts
├── dealer/            ← Dealer entity
├── conversation/      ← Conversation entity (phone calls, messages)
├── common/            ← Shared guards, pipes, interceptors (empty)
├── main.ts            ← Bootstrap
└── app.module.ts      ← Root module + DB config + seed data
test/
├── factories/         ← Test data factories (createLead, createDealer)
├── *.spec.ts          ← Test files
└── *.exercise.md      ← Exercise descriptions
```
