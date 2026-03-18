---
name: implement
description: Implements a feature using BDD/TDD — one test at a time
---

Implement $ARGUMENTS using strict TDD:

## Process
1. Read the feature description / acceptance criteria
2. List all acceptance criteria as a numbered checklist
3. For EACH criterion, one at a time:
   a. Write ONE failing Jest test
   b. Run `npx jest` — confirm it fails
   c. Write the minimum code to make it pass
   d. Run `npx jest` — confirm it passes
   e. Ask: "Criterion N done — move to next?" Wait for approval.
4. After all criteria pass: run full suite `npx jest`

## Rules
- Never write more than one test at a time
- Never skip the red-green cycle
- Use factory functions from test/factories/ for test data
- Use service classes for business logic (src/*/service.ts)
- Use DTOs with class-validator for input validation
- Show test output after each run
- Follow existing patterns in the codebase
