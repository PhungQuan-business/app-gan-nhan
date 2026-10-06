# Project

## Overview

A unified data and AI platform for AI engineers and dentists to manage the lifecycle of medical data, deep learning models, and knowledge graphs in one workspace.

The platform reduces friction between data preparation, model development, deployment, and knowledge management by providing a standardized workflow and shared workspace.

## Goals

- Reduce time from raw data upload to a training-ready dataset.
- Reduce time from validated dataset to trained model.
- Reduce time from trained model to deployment.
- Standardize knowledge graph rule creation and management.
- Reduce unnecessary movement of medical data between systems.

## Scope

### In Scope

- Medical data upload and validation
- Patient data management
- Bounding-box annotation and review
- Dataset creation and versioning
- Deep learning model training
- Experiment tracking
- Model deployment
- Knowledge graph rule management

### Out of Scope

- General dental clinic management
- Appointment scheduling
- Billing and payment
- Unrelated clinical management

## Users

- AI Engineer
- Dentist
- Administrator

## Core Features

- **Data** — Upload, validate, annotate, review, and organize medical data.
- **Datasets** — Create and version training datasets.
- **Models** — Train, evaluate, track, and deploy models.
- **Knowledge Graph** — Create and manage standardized rules.

## Architecture

The system uses a modular service-oriented architecture:

- Frontend
- Application Backend
- AI Services
- PostgreSQL
- Object Storage
- Experiment Tracking
- Infrastructure

See [`docs/architecture.md`](docs/architecture.md) for details.

## Technology

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, NestJS
- AI: Python, FastAPI
- Database: PostgreSQL, Prisma
- Object Storage: MinIO
- Experiment Tracking: MLflow
- Authentication: Keycloak
- Infrastructure: Proxmox
- CI/CD: GitHub Actions
- Testing: Playwright

## Repository

```text
.
├── src/          # Application source code
├── specs/        # Feature requirements and acceptance criteria
├── docs/         # Architecture and engineering documentation
├── tests/        # Test suites
├── .github/      # CI/CD and GitHub configuration
├── AGENTS.md     # AI agent instructions
└── README.md     # Project overview
```

## Development

Read `AGENTS.md` before modifying the repository.

Feature requirements are defined in `specs/`. Architecture and engineering decisions are documented in `docs/`.

Use the project's Gitflow workflow and verify changes with the appropriate tests and quality checks before merging.