# Happy Business Suite — Frontend

A React + TypeScript + Vite frontend prototype for the configurable, multi-industry Happy Business Suite.

## Start locally

```bash
npm install
npm run dev
```

To run the production build:

```bash
npm run build
npm run preview
```

## Current user flow

1. Choose an industry and an implementation plan on the welcome page.
2. Create an account with full name, work email, phone number and password.
3. Go directly to the separate Import page. Importing can be skipped to enter the dashboard.
4. Complete business profile, address and workspace preferences later under Settings.

The selected industry drives the workspace navigation. Courier / Logistics does not show Appointments; it shows shipments, tracking and pickup/delivery navigation. Hotels use reservation/room navigation, and Real Estate uses leads/properties/site-visit/deal navigation.

## Prototype limitations (important)

- Account information and the business profile are stored in browser session/local storage for this frontend demo. This is not production authentication or secure multi-tenant persistence.
- CSV/Excel selection is available, but parsing, column mapping, validation against a schema and database import are not connected yet. The UI deliberately tells users the file is selected rather than claiming it has been imported.
- Google Drive and OneDrive are presented as options, but OAuth and cloud file browsing are not configured. No cloud connection is simulated.
- Several dashboard tables and charts use sample display data. Some CRUD, invoice, reporting and team actions still require backend/API integration.
- Do not put secrets in frontend environment variables. Keep production credentials and backend configuration outside this package.

This package contains frontend code only. It does not modify or deploy the existing Happy Technologies marketing website or backend service.
