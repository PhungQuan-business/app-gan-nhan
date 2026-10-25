# AGENTS.md

Do everything you can yourself, including starting apps and running verification.

## Project

- pnpm monorepo.
- `apps/backend`: TypeScript 6, Express 5, Prisma 7.
- `apps/frontend`: Vite 8, TypeScript 6.
- `docker-compose.yaml`: local database.
- A Web application for labelling data, building knowledge base and end to end AI model and knoweldge graph lifecycle

## Startup

1. Run `pwd`.
2. Read `agent-progress.md`.
3. Read `feature_list.json`. Pick the top unfinished feature.
4. Run `git log --oneline -5`.
5. Run `./init.sh`.
6. Run smoke or end-to-end checks.

If baseline fails, fix it first.

## Working Rules

- One feature at a time.
- Stay in scope. Narrow fixes only for blockers.
- Code added does not mean feature done.
- Never change verification rules silently.
- Prefer repo artifacts over chat summaries.
- Artifacts: `feature_list.json` (feature state), `agent-progress.md` (log), `init.sh` (startup), `DESIGN.MD`, `session-handoff.md`(optional).

## Coding Style

- ESM TypeScript. Explicit types at public boundaries.
- Run `pnpm lint_fe` for frontend and `pnpm lint_be` for backend. ESLint is the authority.
- Files: kebab-case with role suffix (`auth.service.ts`).
- `camelCase` vars and functions, `PascalCase` types and classes, `SCREAMING_SNAKE_CASE` env vars.

## Backend (`apps/backend`)

Layout:
- `src/app.ts`: app setup, middleware, routes.
- `src/server.ts`: starts server. No logic.
- `src/<feature>/`: `.route.ts`, `.controller.ts`, `.service.ts`.
- `src/utils/`: shared helpers.
- `src/generated/prisma/`: generated. Never edit.
- `config/prisma.ts`, `middleware/`, `types/`: outside `src/`.
- `prisma/schema.prisma`: schema.
- `scripts/`: install, verify, prisma smoke test.
- `tests/`: mirrors `src/`. Files end in `.test.ts`.
- `dist/`: build output. Never edit or commit.

Rules:
- New feature: new `src/<feature>/` folder, mount router in `app.ts`, add tests.
- Route wires paths. Controller validates and responds. Service holds logic and Prisma calls.
- Controllers never call Prisma.
- Import Prisma only from `config/prisma.ts`.
- Protect private routes with `authenticate`.
- Secrets from env. Never hardcode.
- Schema changes only in `schema.prisma`. Add a migration each time. Never edit applied ones.
- Regenerate the Prisma client after schema changes.

Verify:
1. `pnpm lint_be`, type check, build.
2. Tests.
3. `scripts/verify.sh`.
4. Prisma smoke test if the DB layer changed.
5. Start server. Call changed endpoints. Check status and body.

## Frontend (`apps/frontend`)

refer to frontend instruction at FRONTEND.md

## Finish

Done when:
- Behavior is implemented.
- Required verification ran.
- Evidence is in `feature_list.json` or `agent-progress.md`.
- Repo restarts cleanly from `./init.sh`.

Before ending:
1. Update agent-progress.md.
2. Update feature_list.json.
3. Record any unresolved risk or blocker.
4. Commit with a descriptive message once the work is in a safe state.
5. Leave the repo clean enough for the next session to run ./init.sh immediately.