# Architecture

## Purpose

This platform gives AI engineers and dentists one workspace for the lifecycle of medical data, deep learning models, and knowledge-graph rules. Its architectural goal is to reduce handoffs and unnecessary movement of medical data while supporting a standardized workflow from upload through deployment.

Feature behavior is defined in `specs/`. This document describes the platform boundaries and approved technology direction; it does not define feature APIs, data schemas, or business rules.

## System Shape

The system uses a modular, service-oriented architecture. Components should have clear responsibilities and communicate through documented interfaces defined by the relevant specification.

| Component | Responsibility | Technology direction |
| --- | --- | --- |
| Frontend | User workflows for data, datasets, models, and knowledge-graph management | Next.js, React, TypeScript, Tailwind CSS |
| Application backend | Application workflows, access-controlled operations, and coordination between platform capabilities | Node.js, NestJS |
| AI services | AI-specific capabilities related to deep learning workflows | Python, FastAPI |
| Relational data | Platform data that requires relational persistence | PostgreSQL, Prisma |
| Object storage | Medical data and other stored objects | MinIO |
| Experiment tracking | Training and experiment tracking | MLflow |
| Authentication | Identity and access management | Keycloak |
| Infrastructure | Runtime hosting and operational environment | Proxmox |
| CI/CD | Automated delivery and repository automation | GitHub Actions |

## Lifecycle and Boundaries

The intended workflow is:

1. Medical data is uploaded and validated.
2. Authorized users manage patient data, annotate and review bounding boxes, and organize data into versioned datasets.
3. AI engineers train and evaluate deep learning models, with experiments tracked before deployment.
4. Deployed models and knowledge-graph rules remain part of the same shared platform.

The platform is in scope for medical data, patient data, annotation and review, datasets, models, experiment tracking, deployment, and knowledge-graph rule management. General dental clinic administration, appointment scheduling, billing, and unrelated clinical management are out of scope.

## Decision Ownership

- `specs/` is the source of truth for feature behavior, inputs, outputs, permissions, errors, edge cases, and acceptance criteria.
- This document is the source of truth for the architectural direction described above.
- Significant architectural changes require a documented reason, an update to this file, and an ADR when the decision has long-term consequences.
- Do not introduce services, dependencies, abstractions, or integration patterns unless an approved requirement or architectural decision calls for them.
