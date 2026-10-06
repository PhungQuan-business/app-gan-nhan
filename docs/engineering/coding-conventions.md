# Coding Conventions

## Guiding Principles

- Read `README.md`, `AGENTS.md`, the relevant `specs/`, and applicable documentation before changing code.
- Make the smallest correct change for one focused feature or task.
- Follow approved specifications and architecture; do not invent business rules, APIs, or architectural decisions.
- Reuse established repository patterns and dependencies when they exist. Do not modify unrelated code.
- Keep code simple, testable, maintainable, and clear about its responsibility.

## Languages and Frameworks

Use idiomatic conventions for the platform’s approved technologies:

- TypeScript for the Next.js/React frontend and Node.js/NestJS application backend.
- Python for FastAPI AI services.
- PostgreSQL and Prisma for relational persistence.

Project-specific patterns, formatter and linter rules, type checking, and static-analysis configuration take precedence when they are introduced. This document does not select tooling that is not already defined by the project.

## Code Structure

- Keep modules focused on a single responsibility and maintain clear boundaries between frontend, backend, AI services, persistence, and infrastructure concerns.
- Use names that communicate the domain concept and intent. Prefer explicit code over clever or implicit behavior.
- Validate external input at system boundaries. Keep domain behavior consistent with the approved feature specification.
- Keep authentication and authorization controls intact; permissions must be derived from documented requirements.
- Put behavior requirements in `specs/`, architectural decisions in architecture documentation or ADRs, and project-wide engineering rules in `docs/engineering/`.

## Change Discipline

- Add or update tests appropriate to a behavior change.
- Update documentation when a significant implementation or architectural change affects it.
- Keep commits focused and meaningful, and follow the repository Gitflow rules in `AGENTS.md`.
- Do not claim a command, test, or verification was completed unless it was actually performed.
