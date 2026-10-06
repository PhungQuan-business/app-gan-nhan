# Security

## Baseline Rules

- Never commit secrets, credentials, tokens, private keys, or other sensitive configuration.
- Validate external input at every applicable system boundary.
- Preserve authentication and authorization controls. Do not weaken security controls without explicit approval.
- Treat medical and other sensitive data according to approved project requirements.

## Responsibilities

Security is part of feature delivery, not a later cleanup task. When a change accepts external input, handles medical data, changes access control, communicates with another service, or alters storage behavior, evaluate its security impact as part of the implementation and test plan.

Feature specifications must define the relevant permissions, input and output behavior, errors, edge cases, and non-functional requirements. Do not create or relax access rules without an approved specification or architectural decision.

## Sensitive Data

The README identifies medical data and patient data as in scope. Product-specific requirements for retention, access, auditing, deployment, and regulatory compliance must be documented in approved specifications and architectural decisions before implementation. This document does not claim a particular compliance certification or introduce requirements that have not been approved.

## Security Review

For security-sensitive changes:

1. Review the relevant specification and existing architecture before implementation.
2. Preserve existing authentication and authorization boundaries.
3. Add or update tests that verify the required validation and access behavior.
4. Document significant architectural implications and add an ADR when the decision has long-term consequences.
5. Escalate ambiguous requirements or risk acceptance decisions to human owners; humans retain final approval.
