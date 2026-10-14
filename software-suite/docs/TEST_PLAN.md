# Test plan and acceptance checklist

## Automated validation tests included
- Registration accepts a valid name, email, strong password, supported industry and supported plan.
- Registration rejects invalid email, short password, unsupported industry and unsupported plan.
- Login rejects malformed email and empty password.
- Workspace validation rejects a one-character name.
- Customer validation rejects short names/phone numbers.
- Frontend mapping translates all supported human-readable industries and plan names into API enum values.
- Missing frontend selection uses safe defaults; production UX should still require explicit selection before registration.

## Manual end-to-end tests required
1. Register a new email with Clinic / Healthcare + Professional; ensure account record stores `clinic` and `professional`.
2. Register an existing email; expect HTTP 409 with a friendly message.
3. Login with a wrong password; expect HTTP 401 without revealing whether the email exists.
4. Create a workspace; verify owner membership, business profile and subscription trial rows are created in one transaction.
5. Confirm trial start and end are one day apart, based on database timestamps.
6. Create a customer and enquiry; verify both belong to the current workspace.
7. Attempt to reference a customer ID from another workspace; expect rejection.
8. Use an expired/invalid token; expect HTTP 401 and frontend redirect to login.
9. Stop PostgreSQL and call health endpoint; expect HTTP 503 with no database credentials or stack trace.
10. Test registration, dashboard, customer/enquiry tables and settings at 375px, 768px and 1440px widths.
11. Verify empty/loading/error states and keyboard focus/labels.
12. Run frontend/backend tests, typechecks and production builds before merging.

## Performance checks before launch
- Check bundle sizes from `vite build`; lazy-loaded route pages should stay split.
- Verify indexed workspace-scoped queries with `EXPLAIN ANALYZE` on representative data.
- Validate GET cache invalidation after POST/PATCH/DELETE; never cache authenticated responses in a shared proxy. The current cache is in-memory per browser tab and has a short TTL.
- Add pagination/server-side filtering before tables exceed small MVP datasets.
- Load-test API endpoints and set database pool limits based on hosting capacity.

## Release gate
Do not deploy until database-backed integration tests, tenant isolation tests, auth/session review, backup/restore drill, OAuth verification, billing/trial enforcement and privacy/compliance review for clinic data are complete.
