# AGENTS.md

## Purpose

This file defines how AI coding agents work in this repository.

Read `README.md` first. Then read the relevant `specs/` and `docs/` before making changes.

## Core Rules

- Understand existing code before modifying it.
- Follow documented requirements and architecture.
- Do not invent business rules, APIs, or architectural decisions.
- Ask when requirements are ambiguous or contradictory.
- Prefer the smallest correct change.
- Do not modify unrelated code.
- Reuse existing patterns and dependencies when appropriate.
- Keep documentation synchronized with significant changes.
- Never claim a command, test, or verification was performed if it was not.

## Feature Development

Work on one focused feature or task at a time.

Each feature should:

1. Have a specification under `specs/`.
2. Define acceptance criteria.
3. Be implemented incrementally.
4. Include appropriate tests.
5. Produce focused, meaningful commits.
6. Be reviewed before merging.

Use relevant specifications and Git history to understand previous decisions and implementation context.

## Specifications

`specs/` is the source of truth for feature behavior.

Specifications should define relevant:

- Purpose and actors
- Inputs and outputs
- Behavior and business rules
- Permissions
- Errors and edge cases
- Acceptance criteria
- Non-functional requirements

Do not implement behavior that contradicts an approved specification.

## Architecture

Follow `docs/architecture.md`.

Do not introduce unnecessary services, abstractions, dependencies, or architectural patterns.

For significant architectural changes:

- Document the reason.
- Update the architecture documentation.
- Add an ADR when the decision has long-term consequences.

## Coding

Use idiomatic conventions for the project's languages and frameworks.

Project-specific conventions take precedence.

Prefer:

- Existing project patterns
- Formatter and linter rules
- Type checking and static analysis
- Simple, testable, maintainable code

Document important project-specific conventions under `docs/engineering/`.

## Testing

For behavior changes:

- Add or update appropriate tests.
- Run relevant unit, integration, or end-to-end tests.
- Run linting and type checking where applicable.
- Run the production build when relevant.

Never weaken or remove tests merely to make a change pass.

## Security

- Never commit secrets or credentials.
- Validate external input at system boundaries.
- Preserve authentication and authorization controls.
- Do not weaken security without explicit approval.
- Handle medical and other sensitive data according to project requirements.

## Gitflow

Use Gitflow:

- `main` — production releases
- `develop` — integration
- `feature/*` — from `develop` → `develop`
- `release/*` — from `develop` → `main` and `develop`
- `hotfix/*` — from `main` → `main` and `develop`

Rules:

- Never commit directly to `main` or `develop`.
- Keep commits focused and meaningful.
- Review changes before merging.
- Do not rewrite shared history or force-push protected branches.

## Completion

A task is complete when:

- The requested behavior works.
- Requirements and architecture are followed.
- Relevant tests and quality checks pass.
- Documentation is updated when necessary.
- No unrelated changes are present.

## AI Responsibility

The agent owns implementation, testing, documentation maintenance, and verification.

Humans own product intent, architectural decisions, risk acceptance, and final approval.