# Happy Business Suite

Happy Business Suite is a React + TypeScript frontend with an Express/TypeScript backend and PostgreSQL schema/migrations.

## Latest frontend changes
- Invoice row actions use **Download PDF** and do not open the browser print dialog.
- Invoice list export downloads CSV.
- Reports page export downloads a CSV summary; report tiles download individual CSV summaries.
- Courier/Logistics Operations (Shipments) includes **Export shipments** CSV. It exports shipment records available in this frontend demo's browser storage; with no saved shipment records, it exports a header-only file rather than inventing shipment data.
- Registration, free-trial/paid-plan demo flow, industry-specific navigation, import preview, account settings and sign-out remain in the frontend.

## Requirements
- Node.js 18.19+ (Node 20 LTS recommended)
- PostgreSQL for backend-connected use

## Frontend setup
```bash
cd frontend
npm install
npm run dev
```

Frontend production build:
```bash
npm run build
```

The `xlsx` dependency is declared in `frontend/package.json` for CSV/Excel import. If installing from scratch, run `npm install` so the lockfile is reconciled with package dependencies before building.

## Backend setup
```bash
cd backend
cp .env.example .env
# Set DATABASE_URL and JWT_SECRET in backend/.env
npm install
npm run build
npm test
```

Review `database/schema.sql`, `database/migrations/`, and the docs before connecting a database. Do not commit secrets from `.env`.

## Important limitations
- The frontend remains a demo for several modules and uses browser storage for some records. Invoice/report/shipment CSV and invoice PDF exports are generated in the browser; they are not yet backed by a live API for every module.
- The report screen's displayed summary metrics are demo values, not guaranteed live database aggregates.
- Google Drive is displayed as a planned import option; OAuth and file picking are not implemented.
- The payment page is a dummy checkout and does not charge customers.
- A full frontend Vite production build could not be completed in the current build environment because Rollup's Linux native optional dependency is missing. The TypeScript project check passed; the backend TypeScript production build passed. Database-backed end-to-end tests have not been run.
- No production deployment was performed. The existing marketing website and deployed backend have not been changed.


## Local frontend + backend integration (first connected phase)

This phase connects email/password authentication, automatic workspace creation, customer and enquiry CRUD creation/listing, appointment/reservation/site-visit records, invoice records, import persistence, and dashboard KPI counts to the API/PostgreSQL. Google Drive remains a placeholder. The dashboard chart, some report cards, shipment/tracking subpages, and business profile form still contain demo-only UI and are not yet fully database-backed.

### 1. Create a local database

Create an empty PostgreSQL database named `happy_business_suite`, then run `database/schema.sql` against it. For an existing database that already has the core schema, run `database/migrations/004_backend_integration.sql` after the previous migrations. Back up any existing database before applying schema changes.

### 2. Configure and start the backend

```bash
cd backend
cp .env.example .env
# Edit .env and set DATABASE_URL and a random JWT_SECRET of at least 32 characters
npm install
npm run build
npm run dev
```

The backend listens on `http://localhost:4000`; health check: `http://localhost:4000/api/business-suite/health`. It should return `status: ok` and `database: connected`.

### 3. Configure and start the frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

`frontend/.env.example` uses `VITE_API_URL=http://localhost:5000/api/business-suite`. If the backend uses a different port, update the URL before starting Vite.

### Connected API areas

- `POST /auth/register` creates the user, workspace, owner membership, business profile and subscription in one transaction; trial plan is 14 days and paid plans are marked `pending_payment` until checkout is implemented.
- `POST /auth/login` returns a JWT and workspace metadata.
- `GET/POST /customers` and `GET/POST /enquiries` are workspace-scoped.
- `GET/POST /records/:module` stores appointment/reservation/site visit/invoice records in workspace-scoped JSONB records.
- `POST /imports` stores supported imported rows in PostgreSQL and records import history. Imports up to 5,000 rows are accepted per request (request body limit 10 MB).
- `GET /dashboard/summary` calculates basic counts from PostgreSQL.

This is not yet a full production release: run the SQL schema, start PostgreSQL, and manually test account creation/login, import persistence, and tenant isolation before using real business data. The local environment used for this build did not have a running PostgreSQL server available, so database end-to-end tests could not be performed here.
