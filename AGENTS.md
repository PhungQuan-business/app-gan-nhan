# AGENTS.md

Whatever action you can do yourself, please do yourself. This include starting apps and performing verification.

## Project overview


## Startup Workflow

Before writing code:

1. Confirm the working directory with `pwd`.
2. Read `agent-progress.md` for the latest verified state and next step.
3. Read `feature_list.json` and choose the highest-priority unfinished feature.
4. Review recent commits with `git log --oneline -5`.
5. Run `./init.sh`.
6. Run the required smoke or end-to-end verification before starting new work.

If baseline verification is already failing, fix that first. Do not stack new
feature work on top of a broken starting state.

## Working Rules

- Work on one feature at a time.
- Do not mark a feature complete just because code was added.
- Keep changes within the selected feature scope unless a blocker forces a
  narrow supporting fix.
- Do not silently change verification rules during implementation.
- Prefer durable repo artifacts over chat summaries.

## Required Artifacts

- `feature_list.json`: source of truth for feature state
- `agent-progress.md`: session log and current verified status
- `init.sh`: standard startup and verification path
- `session-handoff.md`: optional compact handoff for larger sessions

## Coding Style & Naming Conventions

Write ESM TypeScript with explicit types at public boundaries. Follow ESLint (`pnpm lint`) as the formatting and correctness authority. Use lowercase kebab-case filenames with role suffixes: `auth.service.ts`, `user.controller.ts`, and `auth.route.ts`. Name functions and variables in `camelCase`, types/classes in `PascalCase`, and environment variables in `SCREAMING_SNAKE_CASE`.

## Definition Of Done

A feature is done only when all of the following are true:

- the target behavior is implemented
- the required verification actually ran
- evidence is recorded in `feature_list.json` or `agent-progress.md`
- the repository remains restartable from the standard startup path

## End Of Session

Before ending a session:

1. Update `agent-progress.md`.
2. Update `feature_list.json`.
3. Record any unresolved risk or blocker.
4. Commit with a descriptive message once the work is in a safe state.
5. Leave the repo clean enough for the next session to run `./init.sh`
   immediately.