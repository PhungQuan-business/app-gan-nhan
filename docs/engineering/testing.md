# Testing

## Expectations

Every behavior change requires tests appropriate to its scope and risk. The relevant feature specification defines acceptance criteria; tests should demonstrate that those criteria are met without weakening existing coverage.

Use the appropriate level or levels of testing:

| Test level | Purpose |
| --- | --- |
| Unit | Verify focused logic and edge cases in isolation. |
| Integration | Verify behavior across relevant application, service, persistence, or external-system boundaries. |
| End-to-end | Verify critical user workflows through the system interface. |

Playwright is the documented browser end-to-end testing technology.

## What to Cover

Specifications should identify the expected behavior, permissions, errors, edge cases, and non-functional requirements that need verification. Tests should cover the changed behavior and any affected access-control or validation paths.

For changes involving the platform’s core workflows, select coverage that is relevant to medical data upload and validation, annotation and review, dataset versioning, model workflows, deployment, or knowledge-graph rule management. Do not infer additional behavior beyond the approved specification.

## Required Checks

For a behavior change, run the relevant checks available in the repository:

- Unit, integration, and/or end-to-end tests as appropriate.
- Linting and type checking where applicable.
- A production build when relevant to the change.

Report only checks that were actually run and their actual outcomes. Never remove or weaken tests solely to make a change pass.

## Review

Before merge, confirm that the test coverage matches the specification’s acceptance criteria, that unrelated tests remain intact, and that the change follows the Gitflow and review requirements in `AGENTS.md`.
