-- Run only against the new happy_business_suite database after reviewing.
-- UUIDs use pgcrypto. This script creates the initial schema, not a production migration.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  phone VARCHAR(40) NOT NULL DEFAULT '',
  onboarding_industry VARCHAR(40) NOT NULL DEFAULT 'other' CHECK (onboarding_industry IN ('clinic','retail','real_estate','hotel','education','manufacturing','courier','other')),
  selected_plan_code VARCHAR(40) NOT NULL DEFAULT 'solo' CHECK (selected_plan_code IN ('solo','professional','business')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  email_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) NOT NULL UNIQUE DEFAULT upper(substr(encode(gen_random_bytes(8),'hex'),1,10)),
  name VARCHAR(160) NOT NULL,
  industry VARCHAR(40) NOT NULL CHECK (industry IN ('clinic','retail','real_estate','hotel','education','manufacturing','courier','other')),
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workspace_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(30) NOT NULL DEFAULT 'employee' CHECK (role IN ('owner','admin','manager','employee','accountant')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id,user_id)
);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON workspace_memberships(user_id,is_active);

CREATE TABLE IF NOT EXISTS business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL UNIQUE REFERENCES workspaces(id) ON DELETE CASCADE,
  business_name VARCHAR(200) NOT NULL,
  business_type VARCHAR(160) NOT NULL DEFAULT '',
  phone VARCHAR(40) NOT NULL DEFAULT '',
  email VARCHAR(254),
  website VARCHAR(255) NOT NULL DEFAULT '',
  address_line1 VARCHAR(255) NOT NULL DEFAULT '',
  address_line2 VARCHAR(255) NOT NULL DEFAULT '',
  city VARCHAR(120) NOT NULL DEFAULT '',
  state VARCHAR(120) NOT NULL DEFAULT '',
  postal_code VARCHAR(24) NOT NULL DEFAULT '',
  country VARCHAR(100) NOT NULL DEFAULT 'India',
  currency VARCHAR(3) NOT NULL DEFAULT 'INR' CHECK (currency IN ('INR','USD','GBP','EUR')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  full_name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(254),
  company_name VARCHAR(200),
  created_by UUID REFERENCES users(id),
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(id,workspace_id)
);
CREATE INDEX IF NOT EXISTS idx_customers_workspace_created ON customers(workspace_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customers_workspace_name ON customers(workspace_id,full_name);

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  customer_id UUID,
  title VARCHAR(240) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','demo_scheduled','proposal_sent','converted','lost')),
  source VARCHAR(30),
  budget VARCHAR(120),
  follow_up_at DATE,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT enquiries_customer_workspace_fk FOREIGN KEY (customer_id,workspace_id)
    REFERENCES customers(id,workspace_id) DEFERRABLE INITIALLY IMMEDIATE
);
-- Composite FK above requires a matching unique key.
CREATE INDEX IF NOT EXISTS idx_enquiries_workspace_created ON enquiries(workspace_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_workspace_status ON enquiries(workspace_id,status);
CREATE INDEX IF NOT EXISTS idx_enquiries_follow_up ON enquiries(workspace_id,follow_up_at) WHERE archived_at IS NULL;

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL UNIQUE REFERENCES workspaces(id) ON DELETE CASCADE,
  plan_code VARCHAR(40) NOT NULL DEFAULT 'solo',
  status VARCHAR(30) NOT NULL DEFAULT 'trial',
  trial_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  trial_ends_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '14 days'),
  current_period_ends_at TIMESTAMPTZ,
  provider VARCHAR(30),
  provider_subscription_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Generic module records support industry-specific modules while dedicated schemas evolve.
CREATE TABLE IF NOT EXISTS module_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  module_key VARCHAR(60) NOT NULL,
  record_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES users(id),
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_module_records_workspace_module_created ON module_records(workspace_id,module_key,created_at DESC) WHERE archived_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_module_records_data_gin ON module_records USING GIN(record_data);

CREATE TABLE IF NOT EXISTS import_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  target_module VARCHAR(60) NOT NULL,
  imported_count INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS phone VARCHAR(30);