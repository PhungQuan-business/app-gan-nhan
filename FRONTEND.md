## Frontend (`apps/frontend`)

### Structure
- Keep application code under `src/` and static assets under `public/`.
- Preserve existing Vite, TypeScript, ESLint, and pnpm configuration.
- Use `src/app/` for `App.tsx`, `router.tsx`, and `providers.tsx`.
- Use `src/pages/` for route-level pages, organized by feature or domain.
- Use `src/features/` for feature-specific components, hooks, services, and types.
- Use `src/components/ui/` for reusable UI components.
- Use `src/components/layout/` for shared layouts, headers, and navigation.
- Use `src/services/` for shared API clients and HTTP configuration.
- Use `src/hooks/` for shared React hooks.
- Use `src/lib/` for utilities and third-party integrations.
- Use `src/types/` for shared TypeScript types.
- Keep `src/assets/` for source-imported images and other assets.
- Keep `src/main.tsx` as the React entry point and `src/index.css` for global styles.
- Keep `App.tsx` focused on application composition. Define routes in `app/router.tsx`.
- Keep components small and single-purpose. Avoid unnecessary abstractions.
- Create files and folders only when needed; do not create empty placeholder directories.

### API and State
- Never call `fetch` directly from UI components.
- Keep feature API calls in `src/features/<feature>/services/`.
- Use `src/services/api-client.ts` for shared HTTP behavior.
- Reuse existing API implementations. Do not duplicate API functions or backend endpoints.
- Match existing backend request and response contracts. Never guess fields.
- Centralize shared HTTP configuration, response parsing, and error handling.
- Handle loading, error, empty, and success states.
- Keep secrets out of client code. Only `VITE_` environment variables are exposed to the frontend; never put secrets in them.

### Workflow
1. Inspect existing files, routes, API clients, imports, and backend contracts before changing code.
2. Propose a migration plan before restructuring or deleting files.
3. Preserve existing behavior and reuse dependencies and configuration.
4. Update imports and routes when moving files.
5. Remove duplicate code only after verifying all usages.
6. Create directories and files only when needed.

### Verification
1. Run `pnpm lint_fe`, the TypeScript type check, and `pnpm build`.
2. Start the development server and test relevant flows against the backend.
3. Check browser console errors and network requests.
4. Report commands, actual results, and unresolved issues. Never claim checks passed unless they ran successfully.