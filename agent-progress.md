# Progress Log

## Current Verified State

- Repository root: /home/airc/app-gan-nhan-v2
- Standard startup path: ./init.sh
- Standard verification path: ./init.sh (includes lint, Prisma validate/generate, JS/TS tests, and Python tests)
- Current highest-priority unfinished feature: login-page — build the login screen after landing-page is complete
- Current blocker: None for the landing-page slice; the clean baseline was restored by adding a minimal Python smoke test so pytest accepts the repo as valid.

## Session Log

### Session 001

- Date: 2026-10-20
- Goal: Start the project and verify the repo baseline.
- Completed: Ran ./init.sh successfully through dependency installation; started the Postgres container and launched the backend with `pnpm dev`; confirmed the server responds on port 3000.
- Verification run: `./init.sh` and `curl -I http://localhost:3000`
- Evidence captured: `./init.sh` completed install + lint + Prisma validate + Prisma generate; server returned HTTP 404 at localhost:3000, confirming the app is up and responding.
- Commits: none
- Files or artifacts updated: agent-progress.md, feature_list.json
- Known risk or unresolved issue: Baseline pytest failed because no Python tests existed; this was not a code bug but a repo verification gap.
- Next best step: fix the verification baseline and then implement the landing page.

### Session 002

- Date: 2026-10-22
- Goal: Implement the landing-page feature with the required design and verify the build.
- Completed: Replaced the default Vite starter with a premium dark landing page, added Login/Get Started CTA states, and validated the frontend with lint and build checks.
- Verification run: `pnpm --filter frontend lint && pnpm --filter frontend build`, `./init.sh`, and `curl -I http://127.0.0.1:5173`
- Evidence captured: frontend build succeeded, repo-wide init validation passed, and the running frontend returned HTTP 200 on port 5173.
- Commits: pending final repo commit after review
- Files or artifacts updated: apps/frontend/src/App.tsx, apps/frontend/src/App.css, apps/frontend/src/index.css, feature_list.json, agent-progress.md
- Known risk or unresolved issue: The landing page is implemented and verified; next feature is the login page.
- Next best step: implement the login screen with email/password fields and sign-up link flow
