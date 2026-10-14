# Architecture and engineering standards

## Design approach
- **Feature-oriented frontend:** route pages own page-level state; shared components own repeated presentation.
- **Separation of concerns:** presentation components do not issue SQL; frontend uses a centralized API client; backend routes validate input and call data access logic.
- **Layered backend:** HTTP routes → validation/authentication/authorization middleware → service/data-access boundary → PostgreSQL.
- **Dependency inversion:** frontend depends on API contracts rather than database implementation.
- **Single responsibility:** components should remain small and focus on one purpose.
- **Composition over duplication:** shared form controls, notices, page headers, layout and loading states.
- **Multi-tenant by default:** all tenant data is filtered by the workspace resolved from authenticated membership. Never accept an arbitrary workspace ID from a browser and trust it.
- **Progressive enhancement:** show only modules that exist and are enabled for the user's plan.

## Frontend performance
- React Router route-level `lazy()` and `Suspense` split page chunks.
- Keep dependencies modest; avoid adding charting/grid libraries until needed.
- Use server-side pagination/search for growing tables; the starter uses a bounded 500-record response and should move to pagination before larger datasets.
- Avoid repeated API calls; fetch related dashboard data in parallel.
- Use stable keys and avoid unnecessary global state.
- Add bundle analysis and Web Vitals monitoring before production.
- Use production build, compressed assets, caching headers and CDN where suitable.
- Consider virtualization only for large lists; do not virtualize small lists by default.

## Accessibility and responsive design
- Mobile-first responsive layouts; breakpoints are in `frontend/src/styles/global.css`.
- Visible focus states, semantic labels, status announcements, reduced-motion support and contrast-conscious colors.
- Test keyboard-only operation and screen-reader basics.
- Tables may scroll horizontally on narrow screens; ensure the user can reach all columns.

## Error-handling standards
- Validate inputs on both client and server.
- Use consistent `{ message, code?, details? }` error response shapes.
- Never expose stack traces, SQL messages, secrets or tokens to users.
- Distinguish validation (400), unauthenticated (401), forbidden (403), conflict (409), rate-limited (429) and server errors (500).
- Show loading, empty, success and failure states on every data screen.
- Disable submit while saving and avoid duplicate submissions.
- Log server diagnostics safely; add request IDs and structured logging before production.

## Security caveats to address before production
- Current starter uses a short-lived bearer JWT in browser localStorage for ease of local development. For production, evaluate secure HttpOnly SameSite cookies or a hardened token/session strategy, refresh/revocation, CSRF protections where relevant, email verification, password reset and MFA as appropriate.
- OAuth provider login is not implemented. Implement OIDC state/nonce and strict redirect URI checks before enabling buttons.
- Tenant membership currently resolves the user's first active workspace. Add an explicit workspace selector and server-side active-workspace switching before supporting users in multiple workspaces.
- Add permission middleware to every protected operation before multi-user production use.
- Add audit logging, backup/restore tests, dependency scanning, penetration testing and privacy/legal review.
- For clinic/healthcare use, review applicable data protection and clinical privacy requirements before storing patient or clinical records.
- Add email verification and password reset before public launch.
- Subscription and one-day trial enforcement must be implemented server-side before selling plans.
