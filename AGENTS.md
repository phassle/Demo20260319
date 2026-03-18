# InfuseAI — Workshop Demo

## About
Lead management & conversation intelligence platform for automotive marketplaces.
Nest.js 10 + TypeScript backend. PostgreSQL + TypeORM.
This is a minimal demo project for workshop exercises.

## Commands
- Tests: `npx jest`
- Lint: `npx eslint "{src,test}/**/*.ts"`
- Dev: `npx nest start --watch`

## Rules
- Be concise. List unresolved questions at end of plan.
- All API responses use DTOs (src/*/dto/)
- Services handle business logic, controllers are thin
- Use class-validator decorators for input validation
- Use factory functions from test/factories/ for test data
- Feature branches: feature/IAI-{jira-id}-description

## Architecture
```
src/
├── lead/          ← Lead entity, controller, service, DTOs
├── dealer/        ← Dealer entity
├── conversation/  ← Conversation entity (phone calls, messages)
├── common/        ← Shared guards, pipes, interceptors
└── app.module.ts  ← Root module
test/
├── factories/     ← Test data factories
└── *.spec.ts      ← Test files
```

## Stop rules
- Never modify database migrations without approval
- Never change auth/SSO logic
- Never commit secrets or .env files
- Never push directly to main
