# Agentic Development — Day 1
## From AI assistant to AI colleague: hands-on for Ruby on Rails + React teams

Per Hassle · Monterro · March 3, 2026

---

# Agenda — Day 1 (Tisdag 13:00–16:00)

| Time | Block | The colleague journey |
|------|-------|----------------------|
| 13:00–13:15 | Intro | Why hire an AI colleague? |
| 13:15–14:15 | Workshop 1 | Meet your new colleague |
| 14:15–14:25 | ☕ Break | |
| 14:25–15:30 | Workshop 2 | Onboard her |
| 15:30–15:45 | Workshop 3 | Give her a real task |
| 15:45–16:00 | Q&A + homework | |

---

<!-- ======================== -->
<!-- INTRO: 13:00–13:15       -->
<!-- ======================== -->

# Intro
## Why hire an AI colleague?
### 13:00–13:15

---

## Welcome

**Per Hassle** — Monterro

AI & agentic development across portfolio companies

---

## 💬 Round the table

**Two questions — everyone answers briefly:**

1. What AI tools have you used?
2. What's your experience so far?

---

## Today's through-line

**You've got a new colleague.**

She's brilliant at development — if she gets the right context.

Just like a new developer on day 1:
- Knows nothing about your system
- Give her onboarding → she delivers

Over two sessions we take her through four steps:

```
Today (Tue 13–16):
1. MEET      → What can she do? How does she think?
2. ONBOARD   → Give her context about your project
3. REAL TASK → Try a real Shortcut ticket

Tomorrow (Wed 09–12):
4. TRAIN     → Skills, hooks, integrations
5. TEAM UP   → Multi-agent workflows
6. FULL FLOW → Real work with everything combined
```

---

## What you'll take home

- Understand the paradigm shift — from assistant to agent
- Patterns that work regardless of tool
- An AGENTS.md tailored for Planima's Rails + React codebase
- Automated quality: skills, hooks, MCP integrations
- Multi-agent patterns for feature development
- Experience with real Shortcut tickets using Claude Code

> **Today's tool:** Claude Code — but the patterns apply to all agent tools.

---

## 4% of GitHub public commits are now authored by Claude Code

Projected to reach **20% by end of 2026**.

Programming has changed more in the past several months than in decades.

> The question isn't whether to adopt this — it's how fast you can get good at it.

---

<!-- ================================= -->
<!-- WORKSHOP 1: 13:15–14:15 (60 min)  -->
<!-- Meet your new colleague           -->
<!-- ================================= -->

# Workshop 1
## Meet your new colleague
### 13:15–14:15

---

## Three generations of AI coding help

```
2020    Autocomplete     →  Suggests the next line
2023    Chat             →  "Explain this code"
2025    Agent            →  Reads repo, edits files, runs tests, fixes errors
2026    Agentic dev      →  You lead — she executes entire tasks
```

We're at the bottom. The shift: from **AI that suggests** to **AI that works**.

---

## Assistant vs. colleague

| Assistant | Colleague |
|-----------|-----------|
| You ask → get an answer | You describe a goal → she executes |
| One file at a time | Reads, edits, creates across files |
| You copy-paste | She runs commands, sees errors, fixes them |
| You drive | You lead, she drives |

---

## The secret: AGENTS.md

One file changes everything. It's her **onboarding document**.

### ❌ Without AGENTS.md

```
"Add a properties search endpoint"
→ Creates Express controller     ← Wrong: project is Rails
→ Uses Sequelize                 ← Wrong: ActiveRecord
→ Writes Jest tests              ← Wrong: RSpec
```

### ✅ With AGENTS.md (15 lines)

```
"Add a properties search endpoint"
→ Creates app/controllers/api/v1/properties_controller.rb  ✅
→ Uses ActiveRecord scopes + Pundit policy                 ✅
→ Adds serializer + RSpec request spec                     ✅
```

**Same task. Same agent. Only difference: 15 lines of context.**

The best part: **AGENTS.md works with every tool** — Claude Code, Copilot, Cursor, Gemini CLI. Write once, every agent reads it.

> We'll write yours in Workshop 2. For now, just know it exists.

---

## 💬 How would this change your day?

- Which tasks could you *delegate* instead of just asking for help?
- Where do you spend time on things you'd rather not do?
- Think about your Shortcut board — which tickets could she handle?

---

## How she thinks: the context window

Think of it as her **desk**. Everything she's working with sits on it — when it's full, things fall off the edge.

```
┌─────────────────────────────────────────┐
│  CONTEXT WINDOW (200K tokens)           │
│                                         │
│  🔧 System message        ~5-10K       │
│  📋 AGENTS.md            ~2K tokens     │
│  💬 Your conversation     grows         │
│  📖 Files she's read     ~1-5K/file    │
│  ▶️  Results (tests, errors)  varies    │
│                                         │
│  ← Full? Earliest context forgotten     │
└─────────────────────────────────────────┘
```

**200K tokens ≈ 500 pages of code.** Sounds like a lot — fills up fast.

---

## Context windows across tools (March 2026)

| Model / Tool | Context window | Notes |
|---|---|---|
| **Claude Sonnet 4.6** | 200K tokens | Default in Claude Code |
| **Claude Opus 4.6** | 1M tokens (beta) | 5× larger — for complex tasks |
| **GPT-5.3 Codex** | 400K tokens | OpenAI's coding agent |
| **Gemini CLI** | 1M tokens | Google's open-source agent |
| **Codex Spark** | 128K tokens | Fast, real-time variant |

Context windows are growing fast — but the **patterns for managing them** remain the same.

> Bigger desk ≠ no need to keep it tidy. Even with 1M tokens, you'll fill it on a large feature.

---

## Keeping the desk clean

- `/context` — how full is the desk?
- `/compact` — clean it, keep a summary
- **`/clear` between tasks** — the #1 beginner mistake is mixing tasks in one session. New task? `/clear`.
- **Commit between phases** — the plan survives in git, not in memory
- Keep AGENTS.md short (< 150 lines)

---

## Cost & speed

| Task | Agent time | Agent cost | Human cost (~$37/h) |
|------|-----------|-----------|-------------------|
| Simple bug fix | 2–5 min | $0.05–0.15 | $2–3 |
| New Rails endpoint + tests | 5–15 min | $0.20–0.80 | $9–18 |
| Larger feature (multi-file) | 15–45 min | $1–5 | $18–55 |

**A solution architect costs ~$7,300/mo (~68 000 SEK).**
Claude Code Max plan: **$100/mo.** That's 1.4% of one developer's salary.

> One task saved per day = ROI in the first week. Ten tasks = you've added a team member for 1.4% of the cost.

---

## Agent "time horizon" — and it's accelerating

METR measures how long agents can sustain tasks with 50% reliability.

**Measured data points:**

| Date | Model | 50% time horizon |
|------|-------|-----------------|
| Early 2023 | GPT-4 | ~4 minutes |
| Late 2024 | Claude 3.5 Sonnet | ~40 minutes |
| Early 2025 | Claude 3.7 Sonnet | ~1 hour |
| Mid 2025 | Claude Opus 4.5 | ~5 hours |
| Feb 2026 | Claude Opus 4.6 | **14,5 hours** |

**But the doubling rate itself is shrinking:**

| Period | Doubling time | Source |
|--------|--------------|--------|
| 2019–2024 | ~7 months | METR original study |
| 2023–2025 | ~4,3 months | METR TH1.1 (Jan 2026) |
| Latest models | ~3,5 months | 10× per year |

**What this means — projected forward:**

| Date | Projected 50% time horizon |
|------|---------------------------|
| Feb 2026 | 14,5 hours (measured) |
| Mid 2026 | ~1–2 days |
| Late 2026 | ~1 week |
| Mid 2027 | ~1 month |

Not just faster — **getting faster, faster.**

> The patterns you learn today will carry tasks 10× bigger in a year.

---

## The tool landscape 2026

| Tool | Terminal | Agent mode |
|------|----------|-----------|
| **Claude Code** | ✅ Native | ✅ Full |
| **GitHub Copilot** | Via CLI | ✅ Coding agent |
| **Cursor** | ❌ | ✅ Composer |
| **Windsurf** | ❌ | ✅ Cascade |
| **Gemini CLI** | ✅ Native | ✅ Full |

All can read repos, edit files, run commands. **The patterns are the same.**

> Today: Claude Code. Everything you learn transfers.

---

## 🔴 DEMO: Your first conversation

<!-- Per: open terminal → cd planima project → claude → simple task -->

```
> "Add a health check endpoint at GET /health
   that returns { status: ok, timestamp: Time.current }"

  📖 Reading config/routes.rb...
  📖 Reading app/controllers/application_controller.rb
  ✏️  Creating app/controllers/health_controller.rb
  ✏️  Adding route to config/routes.rb
  ▶️  Running bundle exec rspec... ✅
```

**Notice:** She read existing code first to match the pattern.

---

## 🔴 DEMO: Plan mode — think before you act

```
> "Add soft delete to the Property model"  [Shift+Tab × 2]

  Planning:
  1. Read app/models/property.rb + schema.rb
  2. Generate migration: add deleted_at column
  3. Add default_scope { where(deleted_at: nil) }
  4. Add soft_delete method + restore method
  5. Update existing queries
  6. Add RSpec tests
  Proceed?

> yes → implements → ✅ all specs pass
```

**Plan mode = investigation tool.** She researches before acting.

---

## Two prompts that level up plan mode

### 1. "Ask me questions"

```
Add a React dashboard component that shows
property maintenance status. Poll the API every 10s.
Ask me questions to clarify requirements.
```

→ She interviews you before planning.

### 2. "Give me N options"

```
We need to upgrade from Rails 7.1 to Rails 7.2.
Read the Gemfile, config/ and give me 3 options for the migration approach.
```

→ You get trade-offs laid out. Pick the one you like.

---

## 🔴 DEMO: Bug fix — let her investigate

```
> "Bug: Creating a work order without a description
   should fail validation but currently saves."

  📖 Reading app/models/work_order.rb...
  📖 Reading spec/models/work_order_spec.rb...

  Found it: missing validates :description, presence: true
  ✏️  Added validation + spec
  ▶️  bundle exec rspec spec/models/work_order_spec.rb... ✅
```

**You described the symptom. She found the cause.**

---

## 🔴 DEMO: Same task in VS Code Copilot

<!-- Per: open VS Code → same project → Copilot agent mode → same task -->

Same AGENTS.md, different tool — **same result**:

```
VS Code Copilot (agent mode):
> "Add a health check endpoint at GET /health"

  📖 Reading AGENTS.md...
  📖 Reading config/routes.rb...
  ✏️  Creating app/controllers/health_controller.rb
  ✏️  Updating config/routes.rb
  ▶️  Running bundle exec rspec... ✅
```

**The AGENTS.md rules work in both tools.**

> This is why we write AGENTS.md, not just CLAUDE.md — your rules are portable.

---

## 💬 What did you notice?

- What surprised you?
- What felt different from ChatGPT / Copilot?
- What would you trust her with? What not?

> Key: she **reads code first**, then acts. She doesn't guess.

---

## Commands to know

| Command | What it does |
|---------|-------------|
| `Shift+Tab` | Normal → Auto-accept → Plan |
| `/clear` | Clear conversation (fresh context) |
| `/context` | Show context window usage |
| `/permissions` | Pre-approve tools (less clicking "yes") |
| `Ctrl+C` | Cancel current generation |
| `claude -c` | Resume last conversation |
| `Esc + Esc` | Rewind |

---

## 🛠️ HANDS-ON 1: Try it yourself (15 min)

1. `cd your-project && claude`
2. Ask: "What does this project do? What's the tech stack?"
3. **Plan mode** (Shift+Tab × 2):
   - "We need to add [a small feature]. Ask me questions to clarify, then give me 2 options."
   - Review the plan — don't accept yet. Iterate: "What about edge case X?"
   - When the plan looks good → accept → let her build
4. Try a bug fix: describe a symptom, let her find the cause

**Plan mode takeaway:** You're the tech lead. She investigates and proposes — you decide.

**Write down what she gets wrong — we'll fix it in Workshop 2.**

---

## ☕ Break — 10 min
### We continue at 14:25

---

<!-- ================================= -->
<!-- WORKSHOP 2: 14:25–15:30 (65 min)  -->
<!-- Onboard your AI colleague         -->
<!-- ================================= -->

# Workshop 2
## Onboard your AI colleague
### 14:25–15:30

> Step 2: She needs to know who you are and how you work.

---

## Think tech lead, not solo coder

Your job shifts: from **writing all the code** to **leading an AI colleague**.

You wouldn't put a new developer on a complex task day 1 without context.

You brief, plan together, let her run — then review.

But first: she needs to know **your project**.

---

## The onboarding document: AGENTS.md

Before 2025, every tool had its own config format. Now there's **one standard**:

**AGENTS.md** — used by 60,000+ GitHub repos, supported by every major tool.

| Tool | Reads AGENTS.md? | Also reads |
|------|:-:|---|
| **Claude Code** | ✅ | `CLAUDE.md` |
| **GitHub Copilot** | ✅ | `.github/copilot-instructions.md` |
| **Cursor** | ✅ | `.cursorrules` |
| **Gemini CLI** | ✅ | `GEMINI.md` |
| **Windsurf** | ✅ | `.windsurfrules` |

**Write once. Every agent reads the same rules.**

```bash
# One source of truth
AGENTS.md                    ← All tools read this
ln -s AGENTS.md CLAUDE.md    ← Claude Code also reads this
```

> This is the key insight: your investment in AGENTS.md pays off **regardless of which tool you use tomorrow**.

---

## Why portability matters

```
Today:          Claude Code
6 months:       Maybe also Copilot agent mode, Cursor, or Gemini CLI
1 year:         Who knows which tool is best?

AGENTS.md:      Works with ALL of them. Your rules travel with the code.
```

You're not learning a tool — you're learning a **workflow**.
AGENTS.md is the configuration. The agent is replaceable.

---

## 🔴 DEMO: AGENTS.md in action

<!-- Per: show a real AGENTS.md, run a task, point out how she follows the rules -->

```
> "Add a properties search endpoint with filtering by city"

  📖 Reading AGENTS.md...
  → Knows it's Rails + ActiveRecord + Pundit
  → Creates app/controllers/api/v1/properties_controller.rb
  → Adds scope in app/models/property.rb
  → Creates app/services/property_search_service.rb   ← follows service object rule
  → Writes spec/requests/api/v1/properties_spec.rb
  → bundle exec rspec... ✅
```

**You saw the "without" in Workshop 1. This is the "with."**

---

## 💬 What does she get wrong about your project?

- Framework? Test runner? Folder structure?
- What mistakes do new developers make in your codebase?
- What "obvious" rules have never been written down?

> These are exactly what goes in the onboarding document.

**The 2-mistake rule:** same mistake twice → new AGENTS.md rule. This is how your onboarding document grows organically. Don't try to write everything upfront — let mistakes teach you what to add.

---

## Three layers — just like onboarding a human

| Layer | What | Example |
|-------|------|---------|
| **WHAT** | Tech stack, project structure | "Ruby on Rails 7 + React 18" |
| **WHY** | Purpose of key components | "app/services/ = business logic, never in controllers" |
| **HOW** | Commands, rules, workflow | "`bundle exec rspec` before every commit" |

---

## Example: AGENTS.md for Planima (Rails + React)

This file works with Claude Code, Copilot, Cursor, Gemini — all at once.

```markdown
# Planima

## About
Property management platform. Ruby on Rails 7 backend + React frontend
(migrating from legacy JavaScript). PostgreSQL.
RSpec + FactoryBot for tests. Pundit for authorization.

## Commands
- Dev server: `bin/rails server`
- Tests: `bundle exec rspec`
- Specific test: `bundle exec rspec spec/models/property_spec.rb`
- Console: `bin/rails console`
- Migrations: `bin/rails db:migrate`
- Frontend dev: `cd frontend && npm run dev`

## Rules
- Be extremely concise. Sacrifice grammar for concision.
- At the end of each plan, list unresolved questions (if any).
- Always use service objects for business logic (app/services/)
- Never put business logic in controllers — thin controllers only
- Use Pundit policies for all authorization
- Use FactoryBot for test data — never create records manually in specs
- React components go in app/javascript/components/ (TypeScript)
- Follow Rails upgrade guides when updating framework versions

## Architecture
app/
├── controllers/api/v1/  ← API endpoints (thin, delegate to services)
├── models/              ← ActiveRecord models + validations
├── services/            ← Business logic (one service per use case)
├── serializers/         ← JSON serialization
├── policies/            ← Pundit authorization policies
├── javascript/
│   ├── components/      ← React components (new code goes here)
│   └── legacy/          ← Older JS (being modernized)
spec/
├── models/              ← Model specs
├── requests/            ← API endpoint specs
├── services/            ← Service specs
└── factories/           ← FactoryBot factories
```

Then symlink for Claude Code: `ln -s AGENTS.md CLAUDE.md`

---

## Two rules you should always include

```markdown
- Be extremely concise. Sacrifice grammar for concision.
- At the end of each plan, list unresolved questions (if any).
```

**"Be concise"** → plans and answers become scannable.

**"Unresolved questions"** → she tells you what she doesn't know instead of guessing.

---

## Hierarchy — like CSS cascade

Both AGENTS.md and CLAUDE.md support nesting. The closest file wins.

```
project/AGENTS.md                ← Project-wide (all tools read this)
  ↓
project/app/AGENTS.md            ← Backend-specific overrides
  ↓
project/frontend/AGENTS.md       ← Frontend-specific overrides
```

```
~/.claude/CLAUDE.md              ← Personal (follows you everywhere)
  ↓
project/CLAUDE.md                ← Project-wide (symlink to AGENTS.md)
  ↓
project/app/CLAUDE.md            ← Backend-specific
  ↓
project/frontend/CLAUDE.md       ← Frontend-specific
```

Lower files override higher ones — just like CSS specificity.

> **Tip:** Write rules in AGENTS.md (portable). Symlink CLAUDE.md → AGENTS.md.

---

## When it grows: progressive disclosure

Keep AGENTS.md short — use it as an **index**:

```markdown
## Additional docs
- See docs/architecture.md for Rails patterns
- See docs/testing.md for RSpec conventions
- See docs/upgrade-guide.md for framework upgrade patterns
```

She reads AGENTS.md every session. Referenced docs load on demand.

> Stay under 150 lines. Move details to reference docs.

---

## Pro tip: Let her write the first draft

**Don't use `/init`** — it generates too much generic content. Instead, give her a focused prompt:

```
Analyze this codebase and create an AGENTS.md file following these principles:
1. Keep it under 150 lines — focus only on universally applicable information
2. Cover the essentials: WHAT (tech stack, structure), WHY (purpose), HOW (commands)
3. Use Progressive Disclosure: create a brief index pointing to docs/ files
4. Include file:line references instead of code snippets
5. Assume linters handle code style — don't include formatting guidelines

Additionally, extract patterns you observe into:
- docs/architectural_patterns.md — patterns that appear in multiple files

Reference these files in the AGENTS.md "Additional docs" section.

Finally, create a symlink: ln -s AGENTS.md CLAUDE.md
```

---

## 🛠️ HANDS-ON 2: Write your AGENTS.md (20 min)

**Option A: Generate from your codebase**
1. Run `claude` in the Planima project
2. Use the prompt above to auto-generate
3. Review — edit down to essentials
4. Test: give her a task → does she follow the rules?

**Option B: Start from the template**
1. Copy the Planima example AGENTS.md
2. Customize with your specific rules
3. Test: does she use RSpec, service objects, FactoryBot?

**Commit and push — now the whole team has the same AI onboarding.**

---

## The workflow: Plan → Build → Simplify → Verify

```
0. ONBOARD    AGENTS.md provides context (happens automatically)

1. PLAN       Describe WHAT you want (not how)
              Agent asks questions, suggests a plan

2. BUILD      Agent implements the plan

3. SIMPLIFY   "It works — make it simpler"

4. VERIFY     Agent runs tests — you review
```

---

## Three levels of planning

Match the planning tool to the size of the job:

```
Level 1: Plan Mode (Shift+Tab × 2)
  → Tasks under 1 hour
  → "Plan this, don't start coding until we agree"
  → Plan lives in conversation

Level 2: spec.md / PRD
  → Medium features (1 hour – 1 day)
  → "Write the plan to spec.md before implementing"
  → Plan survives compaction — it's in a file
  → GitHub Spec Kit, PRD generators

Level 3: GSD framework (plan → execute → verify loop)
  → Large projects (days – weeks)
  → Breaks into phases, each with its own plan + verify
  → roadmap.md + requirements.md + state.md
  → Each phase = fresh context = no context rot
```

**The key insight:** always write the plan to a **file** or **issue**, not just the conversation. Files survive compaction. Conversations don't.

Where to write the plan:
- `spec.md` / `plan.md` — lives in the repo, version controlled
- **GitHub issue** — visible to the team, linked to PRs
- **Shortcut story** — acceptance criteria = the plan

> "Planning is 80% of the work. Claude is an excellent executor — but you need to be a good planner." — Agentic Academy

---

## The feedback loop — 2–3× quality

Without feedback loop:
```
Agent codes → "Looks done" → You find bugs in review
```

With feedback loop:
```
Agent codes → Runs rspec → Sees failure → Fixes → Runs again → ✅
```

**How to create one:**
- `"Run bundle exec rspec after every change"`
- Put it in AGENTS.md: `Always run bundle exec rspec before creating a PR`
- **Visual feedback:** `"Run Playwright tests and take a screenshot after each UI change"`

Playwright gives the agent **eyes** — she can see if the UI looks right, not just if the tests pass.

---

## BDD: the ideal agent workflow

If you already think in BDD/TDD — you're already thinking right for agents.

```
BDD:     Describe behavior → write spec → implement → verify
Agent:   Describe what you want → plan → build → verify

Same structure. The spec IS the prompt.
```

Joel Abrahamsson (CTO, Expressen): "I write documentation of the feature as if it already existed. Then I hand it to the agent. It builds it."

> If you can describe **what** something should do (not how) — you can lead an AI agent.

---

## 🔴 Try it: BDD-style prompt on the demo project

`cd demo-project && claude` — then paste this:

```
## Feature: Work Order Priority Escalation

A work order that has been open for more than 14 days without
being assigned should automatically be escalated to "high" priority.

### Expected behavior
- When a work order is created, priority defaults to "normal"
- If 14 days pass and assigned_to_id is still nil, priority
  becomes "high"
- Only work orders with status "open" are affected
- Work orders already assigned are never escalated

### Acceptance criteria
- Create app/services/work_order_escalation_service.rb
- Add a rake task that calls the service
- RSpec tests cover: old+unassigned → escalated, old+assigned → not,
  new+unassigned → not, already completed → not
- Use FactoryBot :old and :unassigned traits from spec/factories/
```

**Notice:** no implementation details. Just *what* should happen.

She'll read schema.rb, find the existing model, and build the feature.

> Describe the feature as if it exists. The agent builds it.

---

## Git worktrees — her own desk

```bash
claude --worktree feature/maintenance-scheduler
# Agent works isolated → commits → pushes → opens PR
# Main is untouched. If it goes wrong: delete the worktree.
```

> One task = one worktree = one branch = one PR.

---

<!-- ================================= -->
<!-- WORKSHOP 3: 15:30–15:45 (15 min)  -->
<!-- Give her a real task               -->
<!-- ================================= -->

# Workshop 3
## Give her a real task
### 15:30–15:45

---

## 🛠️ HANDS-ON 3: Pick a real Shortcut ticket (15 min)

1. Pick a ticket from your Shortcut board (bug fix or small feature)
2. `claude` in your project (with the AGENTS.md from Workshop 2)
3. Use plan mode: describe the ticket
4. Let her plan → review the plan → execute
5. Run `bundle exec rspec` — do the tests pass?

**Tips:**
- Start with something small (a bug fix or simple API change)
- Use "ask me questions" to get a better plan
- Watch: does she follow your AGENTS.md rules?

> We'll continue with more hands-on work tomorrow.

---

## ⚠️ Common mistakes

| Mistake | Why it hurts |
|---------|-------------|
| "I trust the code without checking" | AI code has 1.7× more bugs. **Always review.** |
| "I trust the facts without checking" | She invents stats. Say: "Double check every claim." |
| "I gave it the whole repo as context" | Agent drowns. Give **relevant** context. |
| "I mix tasks in one session" | Context rot. **`/clear` between tasks.** |
| "It works, we ship it" | Without Simplify → deprecated patterns. **Always refactor.** |
| "We don't need AGENTS.md" | Without onboarding, agent guesses. Every time. |

---

<!-- ======================== -->
<!-- Q&A: 15:45–16:00         -->
<!-- ======================== -->

# Q&A + Homework
### 15:45–16:00

---

## Five things from Day 1

1. **You have a new colleague** — she executes entire tasks, not just suggests code
2. **Onboarding is everything** — AGENTS.md = the colleague's day 1 document
3. **Plan → Build → Simplify → Verify** — the workflow
4. **Feedback loops** — tests + TDD = 2–3× quality
5. **Worktrees** — the agent works in isolation, main is always safe

---

## Homework before tomorrow

📝 **1. Refine your AGENTS.md**
- Add rules for mistakes you discovered today
- Commit and push

⚡ **2. Work on a real Shortcut ticket with Claude Code**
- Use plan mode + worktree
- Note: What worked? What didn't?

**Tomorrow 09:00:** Skills, hooks, MCP, multi-agent, spec-driven development

---

# Thank you — Day 1!

Per Hassle · per.hassle@monterro.com · Monterro

---
---
---

# Agentic Development — Day 2
## From one AI colleague to a complete AI team

Per Hassle · Monterro · March 4, 2026

---

# Agenda — Day 2 (Onsdag 09:00–12:00)

| Time | Block | The colleague journey |
|------|-------|----------------------|
| 09:00–09:15 | Recap + Feedback | What happened since yesterday? |
| 09:15–10:15 | Workshop 4 | Train her: skills, hooks, MCP |
| 10:15–10:25 | ☕ Break | |
| 10:25–11:15 | Workshop 5 | Build a team of AI colleagues |
| 11:15–11:50 | Workshop 6 | Real work: full workflow |
| 11:50–12:00 | Q&A + Next steps | |

---

<!-- ======================== -->
<!-- RECAP: 09:00–09:15       -->
<!-- ======================== -->

# Day 1 Recap
### 09:00–09:15

---

## 💬 Feedback from yesterday

🗳️ **Quick round:**

- Who refined their AGENTS.md?
- Who worked on a real Shortcut ticket?
- What mistakes did the agent make — what did you add to AGENTS.md?
- What should we prioritize today?

---

## Model overview (March 2026)

| Model | Strength | Context | Best for |
|---|---|---|---|
| **Opus 4.6** | Most advanced | 1M (beta) | Complex tasks, Agent Teams |
| **Sonnet 4.6** ⭐ NEW | Near-Opus performance | 200K | Daily dev, computer use |
| **Opus 4.5** | Top benchmarks | 200K | Deep coding, Thinking mode |
| **Haiku 4.5** | Fastest, cheapest | 200K | Sub-agents, quick tasks |

**⭐ Sonnet 4.6** (Feb 17) — near-Opus performance at Sonnet pricing.
**70-80% of tasks are fine on cheaper tiers.** Track with `/cost`.

---

<!-- ================================= -->
<!-- WORKSHOP 4: 09:15–10:15 (60 min)  -->
<!-- Train her: skills, hooks, MCP     -->
<!-- ================================= -->

# Workshop 4
## Train her: skills, hooks & integrations
### 09:15–10:15

> She can work. Now we give her routines, tools, and access to your systems.

---

## From onboarding to routines

```
AGENTS.md     = "What we do and why"       (always loaded)
Skills        = "Repeatable tasks"          (loaded on demand)
Hooks         = "Automatic quality checks"  (zero LLM tokens)
MCP           = "Access to your systems"    (external tools)
```

---

## Skills = reusable slash commands

**Sweet spot: 10–15 skills.** Every skill description loads into context. Hundreds of skills = worse output, not better. Pick the ones you actually use.

A skill is a **folder** with `SKILL.md` + supporting files:

```
.claude/skills/review/
├── SKILL.md              ← Entry point
├── checklist.md          ← Your team's review checklist
└── examples/
    └── good-review.md    ← What a good review looks like
```

**Two ways to trigger:**
1. You type `/review app/controllers/api/v1/properties_controller.rb`
2. She auto-activates — description matches your request

> Only the description sits in context. Everything else loads on demand.

---

## Example: /review skill for Rails

```yaml
---
name: review
description: Reviews Ruby on Rails + React code
allowed-tools: Read, Grep, Glob
---

Review $ARGUMENTS:

## Rails
1. N+1 queries? Missing `.includes()` or `.preload()`?
2. Business logic in controller? Should be in service object?
3. Missing Pundit authorization?
4. Raw SQL without parameterization?
5. Missing validations on model?

## React
6. Functional + hooks only?
7. API calls via dedicated service module?
8. TypeScript types defined?

## Testing
9. RSpec specs exist for all new code?
10. FactoryBot used for test data?

## Output
Summarize: ✅ good / ⚠️ warning / ❌ must fix
```

---

## Example: /implement skill — BDD-style TDD

```yaml
---
name: implement
description: Implements a feature using BDD/TDD — one test at a time
---

Implement $ARGUMENTS using strict TDD:

## Process
1. Read the feature description / acceptance criteria
2. List all acceptance criteria as a numbered checklist
3. For EACH criterion, one at a time:
   a. Write ONE failing RSpec test
   b. Run `bundle exec rspec` — confirm it fails
   c. Write the minimum code to make it pass
   d. Run `bundle exec rspec` — confirm it passes
   e. Ask: "Criterion N done ✅ — move to next?" Wait for approval.
4. After all criteria pass: run full suite `bundle exec rspec`

## Rules
- Never write more than one test at a time
- Never skip the red-green cycle
- Use FactoryBot for test data
- Use service objects for business logic
- Show test output after each run
```

Usage: `/implement work order priority escalation`

> She follows the red → green → refactor cycle, one criterion at a time. You approve each step.

---

## Practical skills to create

| Command | What it does |
|---------|-------------|
| `/implement` | BDD-style: one test → implement → next → repeat |
| `/plan-feature` | Multi-phase implementation plan |
| `/verify` | Run tests + review own code + check edge cases |
| `/simplify` | Remove over-engineering (built-in ⭐) |
| `/batch` | Migrations at scale with parallel agents (built-in ⭐) |
| `/review` | Code review with ✅/⚠️/❌ |
| `/commit-push-pr` | Commit, push, create PR |
| `/upgrade-check` | Analyze deprecations before a framework upgrade |

---

## Hooks — automatic quality control

Hooks run **without LLM tokens** — pure programmatic logic.

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "command": "bundle exec rubocop --autocorrect $FILE",
        "timeout": 30
      }]
    }],
    "Stop": [{
      "hooks": [{
        "command": "bundle exec rspec && bundle exec rubocop",
        "timeout": 180
      }]
    }]
  }
}
```

She writes a Ruby file → RuboCop runs automatically.
She finishes → **tests + linting run automatically.**

> Like a CI gate — but before the PR even exists.

---

## The decision matrix

| Question | → Use |
|----------|-------|
| Should she **always** know this? | **AGENTS.md** |
| Should she know this **sometimes**? | **Skill** |
| Should it happen **automatically**? | **Hook** |
| Does she need **external systems**? | **MCP** |

---

## MCP — give her access to your systems

```
Agent ←→ GitHub        (PRs, issues, reviews)
Agent ←→ Shortcut      (stories, epics, iterations)
Agent ←→ PostgreSQL    (run queries)
Agent ←→ Context7      (real-time documentation)
```

```bash
/mcp add github
/mcp add context7
```

**MCP Tool Search** — loads only needed tools: **85% token reduction**.

> Old advice: "Don't connect too many MCP servers."
> New advice: "Connect everything — Tool Search handles the rest."

---

## Shortcut MCP — your ticket system, connected

```bash
/mcp add shortcut
```

```
"Show all stories in the current iteration assigned to me"
"Get story SC-1234 and plan the implementation"
```

> She reads the ticket, plans the work, updates the status — all in one flow.

---

## Context7 — real-time documentation

```
"How to set up Hotwire Turbo in Rails 7.2?"
→ Context7 fetches latest docs → correct answer
```

> No more outdated patterns. She always has the latest docs.

---

## New features to know about ⭐

| Feature | What it does |
|---------|-------------|
| **Extended Thinking** | Now on by default — better plans automatically |
| **HTTP Hooks** | POST JSON to APIs without MCP |
| **LSP Tool** | IDE-like code intelligence in CLI |
| **Image/Screenshot** | Paste screenshots directly |
| **Checkpoints** | Automatic snapshots, `/re` to restore |
| **Remote Control** | Access Claude Code from your phone |

---

## 🛠️ HANDS-ON 4: Create a skill + hook + MCP (20 min)

### Task A: Create `/review` for Planima
1. Create `.claude/skills/review/SKILL.md`
2. Write review checks for your Rails codebase
3. Test: `/review app/controllers/some_controller.rb`

### Task B: Add a Stop hook
1. Add to `.claude/settings.json` → Stop hook
2. `bundle exec rspec` runs automatically when she's done

### Task C: Connect GitHub MCP
```bash
/mcp add github
```
Test: "Show all open PRs" / "Create a PR for this branch"

---

## ☕ Break — 10 min
### We continue at 10:25

---

<!-- ======================================= -->
<!-- WORKSHOP 5: 10:25–11:15 (50 min)        -->
<!-- Build a team of AI colleagues           -->
<!-- ======================================= -->

# Workshop 5
## Build a team of AI colleagues
### 10:25–11:15

---

## Why multi-agent?

One colleague on a big project loses perspective.

Multiple colleagues = **specialization + parallelism**.

Each has her own context window → no "context rot".

> Each colleague has her own desk.

---

## Two patterns

### Sequential (quality)
```
Researcher → Builder → Reviewer
```
Each step refines the result.

### Parallel (speed)
```
Terminal 1: API endpoint (Rails)
Terminal 2: React component (frontend)
Terminal 3: RSpec tests
```
Three things happen at once.

---

## Parallel agents in practice

```bash
Terminal 1: claude -w feature-api    "Add maintenance scheduling API"
Terminal 2: claude -w feature-ui     "Create maintenance calendar React component"
Terminal 3: claude -w feature-tests  "Write integration tests for maintenance flow"
```

All work in isolation. Each opens a PR. You review.

> Three colleagues working while you drink coffee.

---

## Sub-agents — specialized colleagues

A sub-agent is a **focused specialist** with her own context window and limited tools:

```markdown
# .claude/agents/reviewer.md
---
name: reviewer
description: Reviews code for security and Rails conventions
tools: ["Read", "Grep", "Glob"]
---

Focus on:
1. Security (SQL injection, mass assignment, missing authorization)
2. Performance (N+1, missing indexes, unscoped queries)
3. Conventions (thin controllers, service objects, Pundit policies)
4. Testing (RSpec coverage, FactoryBot usage)
```

```bash
claude --agent reviewer "Review the latest changes"
```

> Sub-agent = own context window, returns summary. Your main session stays clean.

---

## Framework upgrades — a perfect multi-agent task

Upgrading Rails (or React, or any major dependency) touches many files. Parallel agents make it manageable:

```bash
# Agent 1: Update gems + fix deprecations in models
claude -w upgrade-models "Upgrade Rails 7.1→7.2:
fix all deprecation warnings in app/models/"

# Agent 2: Fix deprecations in controllers
claude -w upgrade-controllers "Upgrade Rails 7.1→7.2:
fix all deprecation warnings in app/controllers/"

# Agent 3: Update and fix failing specs
claude -w upgrade-specs "Run bundle exec rspec,
fix all failures caused by the Rails 7.2 upgrade"
```

---

## When to use what

```
Feature with dependencies?  → /implement (sequential TDD)
  "Add work order escalation with service + tests + rake task"
  → Parts depend on each other — build step by step

Same change across many files? → /batch (parallel)
  "Fix all Rails 7.2 deprecation warnings"
  → 50 files, same kind of fix — run in parallel
```

## /batch — large-scale changes

```
/batch "Find and fix all Rails 7.2 deprecation warnings across the codebase"
```

She researches → splits into 5–30 independent units → shows you a plan.
You approve → each unit runs in its own worktree → each opens a PR.

**Good for:** deprecation fixes, gem upgrades, renaming conventions, adding missing tests.
**Not for:** features where parts depend on each other — use `/implement` or plan mode instead.

---

## Spec-driven development

You already have a spec engine: **Shortcut stories**.

But the quality of the spec determines the quality of the output. Follow this flow:

```
1. SPECIFY    Write the story: what should happen? Who is it for?
              → "As a property manager, I want to see overdue work orders"

2. CLARIFY    Ask the agent: "What questions do you have?"
              → She asks about edge cases, scope, constraints
              → You answer → spec gets tighter

3. PLAN       Agent proposes implementation plan
              → You review: files, approach, test strategy
              → Iterate until the plan is solid

4. BUILD      Agent implements the plan (TDD: one test at a time)

5. VERIFY     Run tests + review + /simplify

6. DELIVER    Commit → push → PR against story requirements
```

> The developer role shifts from "write code" to **"specify, clarify, verify."**

---

## BDD + AI agents = a perfect match

Joel Abrahamsson (CTO, Expressen) described how years of **BDD discipline** turned out to be the perfect preparation for AI agents:

```
BDD mindset:
  "Describe WHAT should happen from the user's perspective"
  → Write spec first → then implement

Agent mindset:
  "Describe WHAT you want built"
  → Give spec to agent → agent implements

Same thinking. Different executor.
```

His workflow: write documentation of the feature **as if it already existed** → hand it to Claude Code with AGENTS.md → agent implements.

> The habit of thinking in *what*, not *how*, is exactly what makes you effective with agents.

---

## 💡 This changes who can build software

If the key skill is **describing what should be built** (not writing code) — then the people closest to the user are the best "prompters":

```
Traditional:
  PM writes spec → waits for sprint → dev builds → PM tests

With agents:
  PM writes spec → agent builds → PM verifies → dev reviews quality
```

**Real examples:**
- Dennis Yang (Chime): PM delivering production-ready features
- Pierce (VS Code PM): Sending PRs via Agent Sessions
- Joel Abrahamsson (CTO, Expressen): builds features by writing specs, not code

> Development moves closer to the people who understand the problem best — CPOs, PMs, domain experts.

---

## The new bottleneck: ideas, not code

```
Before agents:
  Bottleneck = developer capacity
  "We have 50 tickets but only 5 devs"

With agents:
  Bottleneck = idea quality
  "We can build anything — but what SHOULD we build?"
```

When building is cheap, the hard part becomes:
- **Knowing what to build** — understanding the user's actual problem
- **Describing it precisely** — acceptance criteria, edge cases, constraints
- **Evaluating the result** — does this actually solve the problem?

The scarce skill is no longer coding. It's **product thinking**.

> The teams that win will be the ones that can generate and validate ideas fastest — not the ones that code fastest.

---

## What this means for Planima

```
Today:
  Erik/PM defines ticket → Developer picks up → builds → PR

Near future:
  Erik/PM writes detailed Shortcut story with acceptance criteria
  → Agent reads story + AGENTS.md → builds → opens PR
  → Developer reviews code quality + security
  → PM verifies against acceptance criteria
```

The developer becomes the **quality gate**, not the bottleneck.
The PM becomes the **spec writer**, not the ticket-waiter.

> You don't need fewer developers. You need developers who are great at reviewing, architecture, and edge cases — and PMs who write great specs.

---

## Context engineering > Prompt engineering

```
❌ "Add maintenance scheduling"
✅ "Add maintenance scheduling for properties:
    - Recurring schedules (weekly, monthly, yearly)
    - Assign to contractors from the contractors table
    - Email notification 3 days before due date
    - Edge cases: holidays, contractor unavailable
    - Use existing service object pattern in app/services/"
```

> Context engineering is the developer's new superpower.

---

## Security: she's good but not flawless

### Most common Rails mistakes

| Risk | What she misses |
|------|----------------|
| Missing Pundit authorization | New endpoint without `authorize` |
| Mass assignment | Not using strong parameters |
| N+1 queries | Missing `.includes()` on associations |
| SQL injection | Raw SQL with string interpolation |
| Exposed secrets | Hardcoded keys instead of `Rails.credentials` |

> **Put them in AGENTS.md** → she stops making them.

---

## Three layers of control

```
Tests          →  define WHAT can be done     (deterministic)
AGENTS.md      →  tell WHEN to do it          (guidance)
Hooks / CI     →  FORCE it to happen          (automatic)
```

> Three layers, zero trust. She can't skip quality checks.

---

## 🛠️ HANDS-ON 5: Multi-agent with Plan → Build → Simplify → Verify (15 min)

### Option A: Parallel feature — full workflow per agent

```bash
# Terminal 1 (API):
claude -w feature-api

> "Plan: Add a work order assignment endpoint.
>  A manager can assign a work order to a technician.
>  Ask me questions first."
> → Review plan → accept
> → "Build it with TDD — one test at a time"
> → "Now /simplify"
> → "Run bundle exec rspec — verify everything passes"

# Terminal 2 (Tests):
claude -w feature-tests

> "Write integration specs for the work order assignment flow"
```

### Option B: Framework upgrade task
```bash
claude -w upgrade-fix "Find and fix all Rails deprecation warnings
in app/models/. Plan first, then fix one file at a time, run rspec after each."
```

> Every hands-on follows the same rhythm: **Plan → Build → Simplify → Verify.**

---

<!-- ======================================= -->
<!-- WORKSHOP 6: 11:15–11:50 (35 min)        -->
<!-- Real work: full workflow                 -->
<!-- ======================================= -->

# Workshop 6
## Real work: full workflow
### 11:15–11:50

---

## The full workflow — everything together

```
1. PLAN      Pick a Shortcut story → describe it → iterate the plan
2. BUILD     TDD: one test at a time
3. SIMPLIFY  "It works — make it simpler"
4. VERIFY    Run tests + review
5. DELIVER   Commit → push → PR
```

---

## "TDD: one test at a time" — how it works

Don't say "build the feature". Say this:

```
"Write ONE failing test for [first acceptance criterion].
 Then implement just enough to make it pass.
 Show me the result before moving on."
```

Then repeat:

```
"Good. Next test: [second criterion]. Same approach."
```

**Why this works:**
- She stays focused — small context, fewer mistakes
- You review each step — catch issues early
- It mirrors how you'd pair-program with a human

> Think of it as pair programming: you're the navigator, she's the driver.

---

## 🛠️ HANDS-ON 6: Full workflow (30 min)

**Put it all together on a real Shortcut ticket:**

1. **Pick a Shortcut ticket** (medium complexity)
2. **Start in a worktree:** `claude -w feature/SC-XXXX`
3. **Plan:** describe the ticket → "ask me questions" → iterate the plan
4. **Build with TDD:**
   - "Write one failing test for [first acceptance criterion]"
   - "Make it pass"
   - "Next test: [second criterion]"
   - Repeat until done
5. **Simplify:** `/simplify`
6. **Verify:** `bundle exec rspec` all green
7. **Deliver:** commit → push → PR (or `/commit-push-pr`)

**Bonus:**
- Use `/review` on your own code before the PR
- Try two agents in parallel on independent work

---

<!-- ======================== -->
<!-- Q&A: 11:50–12:00         -->
<!-- ======================== -->

# Q&A + Next Steps
### 11:50–12:00

---

## The 7 levels — from one colleague to a team

| Level | Focus | Key concept |
|-------|-------|-------------|
| 1 | Onboarding | AGENTS.md |
| 2 | Planning | Plan → Build → Simplify → Verify |
| 3 | Git workflow | Worktrees, PR review |
| 4 | Repeatability | Skills, hooks, automation |
| 5 | Integrations | MCP (GitHub, Shortcut, Context7) |
| 6 | Specs & quality | SDD, adversarial review |
| 7 | Agent team | Multi-agent, parallelism |

---

## Recommended path for Planima

### Week 1: Foundation
- Commit AGENTS.md — whole team uses it
- Plan mode + worktree for daily tasks
- 2-mistake rule: same error twice → new AGENTS.md rule

### Week 2: Automation
- Create `/review` and `/implement` skills
- Add Stop hook (rspec + rubocop)
- Connect GitHub MCP

### Week 3: Scale
- Open 2–3 terminals → parallel agents on independent Shortcut tickets
- Try `/batch` for a real task: "Fix all deprecation warnings in app/models/"
  → `/batch` researches the codebase, splits into 5–30 units, shows you a plan
  → You approve → each unit runs in its own worktree → each opens a PR
- Connect Shortcut MCP (`npm install @shortcut/mcp@latest`)

### Week 4+: Autonomy
- Agent Teams for complex features
- Spec-driven: story → agent builds → you review
- Track costs, optimize model selection

---

## Next steps

1. **Commit your AGENTS.md** — share with the team via git
2. **Create a skill** for your most common task
3. **Connect GitHub MCP** — PRs and reviews from Claude
4. **Add Stop hook** — rspec + rubocop after every task
5. **Try parallel agents** on independent tickets
6. **Try `/batch`** for large-scale changes (gem upgrades, deprecation fixes)

---

## Take-home kit

| Resource | Link |
|----------|------|
| Claude Code docs | code.claude.com |
| Skills marketplace | skillsmp.com |
| MCP servers | awesome-mcp-servers (GitHub) |
| AGENTS.md standard | agents-md.org |
| GitHub Spec Kit | github.com/github/spec-kit |
| Context7 | context7.com |

---

## Follow-up

We'll schedule a **follow-up in 2–4 weeks:**

- What have you tried?
- Which tools worked best?
- What patterns emerged?
- Advanced questions and deep dives

---

# Thank you!

Per Hassle · per.hassle@monterro.com · Monterro

---
