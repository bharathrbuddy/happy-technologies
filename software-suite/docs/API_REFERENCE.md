# API reference (local release)

Base URL: `http://localhost:5000/api/business-suite`

Except for health and authentication, send `Authorization: Bearer <token>`. JSON requests use `Content-Type: application/json`.

## Public endpoints

- `GET /health` — checks API and database connectivity.
- `POST /auth/register` — `{ fullName, email, password, industry, planCode, businessName? }`; creates the account, workspace, owner membership, profile and trial row.
- `POST /auth/login` — `{ email, password }`; returns bearer token, user, industry and workspace presence.

Industry codes: `clinic`, `courier`, `hotel`, `real_estate` (the database also retains legacy supported codes). Plan codes: `solo`, `professional`, `business`.

## Workspace and settings

- `POST /workspaces` — create a workspace for an authenticated account without one.
- `GET /business-profile` — read the current workspace profile.
- `PUT /business-profile` — save `businessName`, `businessType`, `phone`, `email`, `website`, `addressLine1`, `addressLine2`, `city`, `state`, `postalCode`, `country`, `currency`, `taxNumber`, `defaultTaxRate`.

## Records

Supported `:module` values: `customers`, `enquiries`, `appointments`, `invoices`, `payments`, `shipments`, `tracking`, `deliveries`, `guests`, `reservations`, `rooms`, `properties`, `leads`, `site-visits`, `deals`, `products`, `files`.

- `GET /records/:module` — list records. Query params: `search`, `status`, `fromDate`, `toDate`, `page`, `pageSize` (1–100), `sortBy` (`createdAt`, `updatedAt`, `title`, `status`, `amount`), `sortOrder` (`asc` or `desc`).
- `POST /records/:module` — create `{ title, status?, amount?, payload? }`.
- `GET /records/:module/:id` — read one active record.
- `PATCH /records/:module/:id` — update supplied fields.
- `DELETE /records/:module/:id` — archive the record (soft delete).

List response: `{ items: [...], pagination: { page, pageSize, totalRecords, totalPages } }`. Every record query is scoped to the authenticated user's active workspace.

## Imports, dashboards and reports

- `POST /imports` — `{ moduleKey, fileName, rows }`; maximum 5,000 rows per request. Server validates required module fields and rejects duplicate identifiers where present.
- `GET /imports` — recent import history for the workspace.
- `GET /dashboard` — counts and monetary totals grouped by module plus monthly activity trend; optional `?module=shipments`.
- `GET /reports` — counts and amount totals grouped by module and status.

## Important data contract
All module records are persisted in PostgreSQL `business_records` using `module_key`, `title`, `status`, optional `amount`, and module-specific `payload` JSON. Monetary values are numeric and the UI formats them as INR. Invoices compute totals from quantity, unit price, discount and tax rate; invoice documents use the browser's print dialog so users can print or save as PDF.
