# Implementation and acceptance checklist

Use these statuses: Not started / In progress / Implemented / Verified / Deferred.
Mark **Verified** only after a test passes on a running build.

## Product journey
- [ ] Product/plan/industry selection page (planned; not included in current starter)
- [ ] Email/password registration and login
- [ ] Email verification and password reset before production
- [ ] Google and Microsoft OAuth configured and tested before being offered
- [ ] Workspace creation with industry and unique code
- [ ] Returning users reopen their saved workspace
- [ ] Explicit workspace selector for users who belong to multiple workspaces

## Business Profile and Settings
- [ ] Edit business name/type/contact details
- [ ] Edit clinic/business address, city, state, postal code and country
- [ ] Currency and tax settings reviewed for target jurisdiction
- [ ] Profile persists after refresh and new login
- [ ] Incomplete-profile reminder and feature-specific required fields
- [ ] Logo upload after secure file storage is implemented

## CRM
- [ ] Create/search customer
- [ ] Create enquiry, link customer, set source/status/budget/follow-up/notes
- [ ] Edit/update status and activity history
- [ ] Add clinic/business-specific fields to enquiry (clinic name, clinic type, address, branch count)
- [ ] Pagination and server-side search for large datasets
- [ ] Duplicate handling and safe archival

## Dashboard
- [ ] Real metrics only, no fabricated values
- [ ] Correct links to filtered lists
- [ ] Loading, empty, success and error states
- [ ] Industry-specific cards are only shown when the corresponding module exists
- [ ] Data respects workspace and role permissions

## Shared business modules
- [ ] Invoice creation, totals, tax, discounts, payment history
- [ ] Invoice PDF generation/print and business profile details
- [ ] Import CSV/XLSX preview, column mapping, validation, confirmation, results/history
- [ ] Secure file storage and access control
- [ ] Team invitations, roles, member limits and backend permission checks
- [ ] Solo/Team/Enterprise entitlements and server-side user limits
- [ ] One-day trial lifecycle and server-side expiry enforcement
- [ ] Subscription checkout/provider webhooks and payment reconciliation

## Industry modules
- [ ] Clinic / Healthcare
- [ ] Retail / Shop
- [ ] Real Estate
- [ ] Hotels / Hospitality
- [ ] Education
- [ ] Manufacturing
- [ ] Courier / Logistics
- [ ] Other Business configurable fields/workflows

## Design, performance, quality
- [ ] Mobile 320px, 360px, 390px, 430px
- [ ] Tablet 768px and 1024px
- [ ] Desktop 1280px and 1440px
- [ ] Portrait and landscape where appropriate
- [ ] No unintended horizontal overflow
- [ ] Keyboard navigation and visible focus states
- [ ] Contrast and text size review
- [ ] Reduced-motion preference respected
- [ ] Loading indicators and duplicate-submit prevention
- [ ] Network errors and server errors show friendly messages
- [ ] Frontend typecheck and production build pass
- [ ] Backend typecheck and production build pass
- [ ] API validation/authentication/authorization tests
- [ ] Tenant-isolation test with at least two workspaces
- [ ] Database migration and backup/restore test
- [ ] Production security/privacy review
- [ ] Existing marketing website and production backend confirmed unchanged

## Definition of done
A feature is done only when its acceptance criteria pass, mobile/tablet/desktop behaviour is reviewed, errors and empty states are tested, permissions are verified, and the checklist evidence is recorded.
