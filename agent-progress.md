# Progress Log

## Current Verified State

- Repository root: /home/airc/app-gan-nhan-v2
- Standard startup path: ./init.sh
- Standard verification path: ./init.sh (includes lint, Prisma validate/generate, JS/TS tests, and Python tests)
- Current highest-priority unfinished feature: `verify-otp-page` is marked `review` in `feature_list.json`. `landing-page`, `login-page`, `signup-page`, `create-account-page`, and `connect-requestotp-api` are passing.
- Current blocker: None. Login and successful account creation now route to the `/app` placeholder; the full authenticated application workspace is not implemented.

## Session Log

### Session 001

- Date: 2026-10-20
- Goal: Start the project and verify the repo baseline.
- Completed: Ran ./init.sh successfully through dependency installation; started the Postgres container and launched the backend with `pnpm dev`; confirmed the server responds on port 3000.
- Verification run: `./init.sh` and `curl -I http://localhost:3000`
- Evidence captured: `./init.sh` completed install + lint + Prisma validate + Prisma generate; server returned HTTP 404 at localhost:3000, confirming the app is up and responding.
- Commits: refactor(frontend): align source structure with guidelines
- Files or artifacts updated: agent-progress.md, feature_list.json
- Known risk or unresolved issue: Baseline pytest failed because no Python tests existed; this was not a code bug but a repo verification gap.
- Next best step: fix the verification baseline and then implement the landing page.

### Session 002

- Date: 2026-10-22
- Goal: Implement the landing-page feature with the required design and verify the build.
- Completed: Replaced the default Vite starter with a premium dark landing page, added Login/Get Started CTA states, and validated the frontend with lint and build checks.
- Verification run: `pnpm --filter frontend lint && pnpm --filter frontend build`, `./init.sh`, and `curl -I http://127.0.0.1:5173`
- Evidence captured: frontend build succeeded, repo-wide init validation passed, and the running frontend returned HTTP 200 on port 5173.
- Commits: d45fb6b — feat: implement landing page
- Files or artifacts updated: apps/frontend/src/App.tsx, apps/frontend/src/App.css, apps/frontend/src/index.css, feature_list.json, agent-progress.md
- Known risk or unresolved issue: The landing page is implemented and verified; next feature is the login page.
- Next best step: implement the login screen with email/password fields and sign-up link flow

### Session 003

- Date: 2026-10-23
- Goal: Redo `landing-page` to match the updated DESIGN.md.
- Completed: Replaced the prior dark auth-panel layout with a responsive slate-toned infrastructure feature section, the requested headline and four metrics, and working `/login` and `/signup` navigation destinations.
- Verification run: `pnpm --filter frontend lint && pnpm --filter frontend build`; browser checks of the landing page, both CTA routes, and a 390px responsive viewport.
- Evidence captured: The browser rendered the requested headline and four metrics; Login reached `/login`, Get started reached `/signup`, and the mobile viewport had no horizontal overflow.
- Commits: landing-page redesign commit created after verification
- Files or artifacts updated: apps/frontend/src/App.tsx, apps/frontend/src/App.css, apps/frontend/src/index.css, feature_list.json, agent-progress.md
- Known risk or unresolved issue: DESIGN.md refers to an attached HTML source reference that was not present in the workspace; implementation follows the visible written content and design tokens.
- Next best step: implement the full login page in the `login-page` feature.

### Session 004

- Date: 2026-10-23
- Goal: Implement and verify the `login-page` feature.
- Completed: Replaced the login route placeholder with an accessible login panel containing email and password inputs, a Login button, and the required sign-up prompt/link.
- Verification run: `pnpm --filter frontend lint && pnpm --filter frontend build`; browser checks of `/login`, the Sign up navigation to `/signup`, and a 390px viewport.
- Evidence captured: Both labeled input fields and the Login button rendered; the exact sign-up prompt appeared at the bottom of the card; Sign up navigated to `/signup`; no horizontal overflow on mobile.
- Commits: 2010db5 — feat: add login page
- Files or artifacts updated: apps/frontend/src/App.tsx, apps/frontend/src/App.css, feature_list.json, agent-progress.md
- Known risk or unresolved issue: Credential submission is not wired to the backend because the feature's specified behavior is limited to the login screen and sign-up navigation.
- Next best step: add the next requested feature to feature_list.json.

### Session 005

- Date: 2026-10-23
- Goal: Implement and verify the `signup-page` feature.
- Completed: Replaced the signup route placeholder with a responsive email-only sign-up panel, Continue button, and the required Sign in prompt/link.
- Verification run: `pnpm --filter frontend lint && pnpm --filter frontend build`; browser checks for both Get started navigation and the Sign in link, field shape, and 390px responsiveness; repository-wide verification.
- Evidence captured: `/signup` displayed exactly one email field, no password field, and a Continue button; Sign in navigated to `/login`; Get started navigated to `/signup`; the mobile viewport had no horizontal overflow.
- Commits: signup-page feature commit created after verification
- Files or artifacts updated: apps/frontend/src/App.tsx, apps/frontend/src/App.css, feature_list.json, agent-progress.md
- Known risk or unresolved issue: Continue is a UI affordance only; the feature specification does not include email OTP or account-creation behavior.
- Next best step: add the next requested feature to feature_list.json.

### Session 006

- Date: 2026-10-23
- Goal: Implement and verify the `verify-otp-page` feature.
- Completed: Wired signup submission to the existing OTP request endpoint, added OTP verification UI and API calls, displayed the sent-code confirmation and invalid/expired errors, retained the signup token for the next signup step, and redirected successful verification to `/`.
- Verification run: `pnpm --filter frontend lint && pnpm --filter frontend build`; browser flow checks using mocked API responses for request success, invalid OTP, and valid OTP; 390px responsive check; `./scripts/verify.sh`.
- Evidence captured: Signup request showed the confirmation then routed to `/verify-otp`; invalid code displayed the backend message below the OTP field; valid code redirected to `/` with no alert; signup token was retained; the 390px viewport had no horizontal overflow.
- Commits: verify-otp-page feature commit created after verification
- Files or artifacts updated: apps/frontend/src/App.tsx, apps/frontend/src/App.css, apps/frontend/src/api/auth.api.ts, apps/frontend/vite.config.ts, feature_list.json, agent-progress.md
- Known risk or unresolved issue: Successful verification routes to `/`, currently the landing page, because no distinct main application route exists.
- Next best step: define/implement the main application route when its feature is specified.

### Session 007

- Date: 2026-10-25
- Goal: Migrate the existing frontend code to the structure defined in `FRONTEND.md`.
- Completed: Moved route selection and app composition to `src/app/`; split landing, login, signup, and OTP pages into page modules; moved auth API functions under `src/features/auth/services/`; centralized POST request handling in `src/services/api-client.ts`; updated the entry point and removed the monolithic app and legacy API modules.
- Verification run: `./init.sh` before migration; `pnpm lint_fe`, `pnpm --filter frontend exec tsc -b`, and `pnpm --filter frontend build` after migration; browser smoke checks at `/`, `/login`, `/signup`, and `/verify-otp`.
- Evidence captured: Baseline repository verification passed; post-migration frontend lint, TypeScript build, and production build passed; all four routes rendered their expected page content.
- Commits: refactor(frontend): align source structure with guidelines.
- Files or artifacts updated: `apps/frontend/src/app/`, `apps/frontend/src/pages/`, `apps/frontend/src/features/auth/services/auth.api.ts`, `apps/frontend/src/services/api-client.ts`, `apps/frontend/src/main.tsx`, `agent-progress.md`, `feature_list.json`
- Known risk or unresolved issue: The working tree still contains unrelated user edits in `AGENTS.md`, `DESIGN.md`, and the untracked `FRONTEND.md`; they were left untouched and excluded from the migration commit.
- Next best step: Continue with the next requested frontend feature.

### Session 008

- Date: 2026-10-25
- Goal: Implement the `create-account-page` feature.
- Completed: Added the account-creation page and `/create-account` route; successful OTP verification now saves the signup token and navigates there; added inline validation matching the backend's minimum eight-character password rule and matching-password requirement; connected submission to the existing `/auth/complete-signup` endpoint; successful creation clears signup credentials and redirects to `/`.
- Verification run: `./init.sh` baseline; `pnpm lint_fe`, `pnpm --filter frontend exec tsc -b`, `pnpm --filter frontend build`, and `./scripts/verify.sh`; browser flows with mocked OTP/signup API responses, including invalid OTP, short password, mismatched passwords, valid signup redirect, and a 390px viewport.
- Evidence captured: All checks passed; `/verify-otp` navigates to `/create-account` on success; form and validation messages render; mocked successful signup returns to `/`; mobile viewport has no horizontal overflow. Updated and parsed `feature_list.json`.
- Commits: none
- Files or artifacts updated: `apps/frontend/src/app/router.tsx`, `apps/frontend/src/features/auth/services/auth.api.ts`, `apps/frontend/src/pages/auth/create-account-page.tsx`, `apps/frontend/src/pages/auth/signup-page.tsx`, `apps/frontend/src/pages/auth/verify-otp-page.tsx`, `apps/frontend/src/App.css`, `feature_list.json`, `agent-progress.md`
- Known risk or unresolved issue: The main application page is not implemented, so success returns to `/` (the landing page). Account-creation browser verification mocked the API; live database signup was not exercised.
- Next best step: Implement the main application route when specified, or test account creation against a configured backend/database.

### Session 009

- Date: 2026-10-25
- Goal: Start and verify `connect-requestotp-api`.
- Completed: Confirmed the existing sign-up form submits through the shared API client to `/api/v2/auth/request-otp`, normalizes the email, reports backend errors in place, prevents duplicate submissions during loading, and stores the success message before navigating to `/verify-otp`. No additional application-code change was needed.
- Verification run: `./init.sh`; `pnpm lint_fe`; `pnpm --filter frontend exec tsc -b`; `pnpm --filter frontend build`; `./scripts/verify.sh`; browser tests with mocked 202 success and 409 error responses.
- Evidence captured: Request URL/method/body verified (`POST /api/v2/auth/request-otp`, normalized email); success navigates and shows OTP confirmation; failure stays on `/signup` and displays server text; pending button reads `Sending…`, is disabled, and blocks a second request. Repository checks passed.
- Commits: none
- Files or artifacts updated: `feature_list.json`, `agent-progress.md`
- Known risk or unresolved issue: Browser API responses were mocked; actual email delivery and configured backend/database were not exercised.
- Next best step: Continue with the next unfinished feature.

### Session 010

- Date: 2026-10-25
- Goal: Update `login-page` for real credential submission and successful navigation.
- Completed: Connected the login form to `/api/v2/auth/login` through the shared auth API client; added typed success response handling, inline failure display, and a pending state; created the placeholder `/app` page showing the signed-in user with logout; account creation now also returns to `/app`.
- Verification run: `./init.sh`; `pnpm lint_fe`; `pnpm --filter frontend exec tsc -b`; `pnpm --filter frontend build`; `./scripts/verify.sh`; browser checks with mocked success and 401 login responses and at a 390px viewport.
- Evidence captured: Successful login posts credentials, stores access token/user in session storage, and opens `/app`; placeholder page renders user details; failed login displays the backend message without navigation; Sign up link navigates to `/signup`; no mobile horizontal overflow. All commands passed.
- Commits: login feature update committed on `feature/landing-page`.
- Files or artifacts updated: `apps/frontend/src/features/auth/services/auth.api.ts`, `apps/frontend/src/pages/auth/login-page.tsx`, `apps/frontend/src/pages/app-home-page.tsx`, `apps/frontend/src/app/router.tsx`, `apps/frontend/src/pages/auth/create-account-page.tsx`, `apps/frontend/src/App.css`, `feature_list.json`, `agent-progress.md`
- Known risk or unresolved issue: Authentication browser checks used mocked responses; live credentials/database were not exercised. The editor may temporarily show a stale missing-module diagnostic for `app-home-page.tsx`, though TypeScript build passed.
- Next best step: Continue with the next requested feature.

### Session 011

- Date: 2026-10-27
- Goal: Implement and verify the `main-app-menu` feature.
- Completed: Replaced the `/app` placeholder with a shared project workspace shell, project context, grouped Data/Models/Deploy navigation, active-state indication, the Upload Data page with contextual guidance, and placeholder destinations for unfinished menu pages. Preserved signed-in user display and logout.
- Verification run: `./init.sh` baseline; `pnpm lint_fe && pnpm --filter frontend exec tsc -b && pnpm --filter frontend build`; `./scripts/verify.sh`; browser navigation checks for initial Upload Data, Training and Endpoints destinations, active navigation, and a 390px viewport.
- Evidence captured: Baseline and post-change verification passed; browser checks confirmed the shared shell persists across destinations, active links expose `aria-current="page"`, and the 390px layout has no horizontal overflow.
- Commits: `feat(frontend): add main app workspace menu`
- Files or artifacts updated: `apps/frontend/src/pages/app-home-page.tsx`, `apps/frontend/src/App.css`, `feature_list.json`, `agent-progress.md`
- Known risk or unresolved issue: Upload Data currently selects files locally only; no upload endpoint is connected. Other navigation destinations are placeholders.
- Next best step: Implement the data upload workflow and replace the placeholder destinations as their features are specified.

### Session 012

- Date: 2026-10-29
- Goal: Implement and verify the `process-upload-folder` feature end to end.
- Completed: Added browser folder-relative and ZIP multipart uploads, temporary backend reconstruction/extraction, Roboflow YAML and filename processing, image/annotation association, duplicate/malformed validation, frontend progress and structured result states, and the 15 GB upload limit. Cleaned and finalized the integration processing test.
- Verification run: `pnpm --filter backend test`; `pnpm lint_be`; backend TypeScript check; `pnpm lint_fe`, frontend TypeScript build, and frontend production build; `./init.sh`; live backend ZIP multipart smoke upload.
- Evidence captured: Backend tests passed with 16 tests; backend and frontend lint passed; backend TypeScript check passed; frontend type and production builds passed; repository verification passed; the live ZIP upload returned HTTP 202 and structured split, patient/date/angle, collection-session, and annotation metadata.
- Commits: `819c048` — `feat: process uploaded YOLO datasets`.
- Files or artifacts updated: `apps/backend/src/data/`, `apps/backend/tests/data/yolo-dataset.service.test.ts`, `apps/frontend/src/features/data/services/data.api.ts`, `apps/frontend/src/pages/app-home-page.tsx`, `apps/frontend/src/App.css`, `feature_list.json`, `agent-progress.md`, package manifests and lockfile.
- Known risk or unresolved issue: Browser-specific folder transport and malformed archive edge cases should receive manual browser coverage; live database persistence, model training, and client files over a true network boundary remain outside this feature's scope.
- Next best step: Keep the verified upload workflow as the baseline and continue with subsequent data-management features.

### Session 013

- Date: 2026-10-29
- Goal: Review the updated AGENTS.md documentation rule and document the upload implementation.
- Completed: Tightened the repository instruction to require function-level TSDoc/JSDoc and comments for non-obvious internal code blocks. Added function documentation and intent comments across the upload route, controller, dataset service, frontend API, and workspace upload page; corrected the required session-log artifact name to `agent-progress.md`.
- Verification run: `pnpm lint_be`; `pnpm lint_fe`; `pnpm --filter backend test`; `pnpm --filter backend exec tsc --noEmit`; `pnpm --filter frontend exec tsc -b`; `pnpm --filter frontend build`.
- Evidence captured: Backend and frontend lint passed, 16 backend tests passed, backend TypeScript compilation passed, and the frontend TypeScript and production builds passed.
- Commits: pending documentation commit.
- Files or artifacts updated: `AGENTS.md`, `agent-progress.md`, backend upload route/controller/service, frontend upload service, and workspace upload page.
- Known risk or unresolved issue: Documentation coverage is complete for the upload feature touched by this update; older unrelated functions elsewhere in the repository are outside this documentation pass.
- Next best step: Apply the clarified documentation standard consistently when changing additional features.
