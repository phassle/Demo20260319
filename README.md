# InfuseAI Workshop Demo Project

A minimal Nest.js lead management API for workshop exercises.

## Intentional issues (for workshop exercises)

1. **Missing validation** — Lead allows empty phone numbers (bug fix exercise)
2. **N+1 query** — LeadsController loads dealer relation one by one
3. **No auth guard** — create endpoint has no access control
4. **No service layer** — business logic lives in controller
5. **No lead scoring** — old uncontacted leads stay at "new" status (BDD exercise)
6. **No DTO** — create endpoint accepts raw body without validation

## Tech stack
- Nest.js 10 + TypeScript
- PostgreSQL + TypeORM
- Jest for testing
- Class-validator for DTO validation (not yet used)

## Commands
- `nx serve api` — start dev server
- `nx test api` — run tests
- `nx lint api` — run linter
- `nx e2e api-e2e` — end-to-end tests

## Domain
InfuseAI is a lead management & conversation intelligence platform for automotive marketplaces.
- **Leads** — customer inquiries from marketplace listings
- **Dealers** — car dealerships receiving leads
- **Conversations** — phone calls and messages between customers and dealers
