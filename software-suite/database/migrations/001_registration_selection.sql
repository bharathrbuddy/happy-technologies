-- Safe additive migration for databases created before industry/plan persistence.
-- Run against the NEW happy_business_suite database, not any production database.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS onboarding_industry VARCHAR(40) NOT NULL DEFAULT 'other';
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS selected_plan_code VARCHAR(40) NOT NULL DEFAULT 'solo';

DO $$ BEGIN
  ALTER TABLE users ADD CONSTRAINT users_onboarding_industry_check
    CHECK (onboarding_industry IN ('clinic','retail','real_estate','hotel','education','manufacturing','courier','other'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE users ADD CONSTRAINT users_selected_plan_code_check
    CHECK (selected_plan_code IN ('solo','professional','business'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
