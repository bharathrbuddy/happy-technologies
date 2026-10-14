-- Happy Business Suite generic operational records and import history.
CREATE TABLE IF NOT EXISTS business_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  module_key VARCHAR(60) NOT NULL,
  title VARCHAR(240) NOT NULL,
  status VARCHAR(60) NOT NULL DEFAULT 'active',
  amount NUMERIC(14,2),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES users(id),
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_business_records_workspace_module_created
  ON business_records(workspace_id,module_key,created_at DESC) WHERE archived_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_business_records_workspace_module_status
  ON business_records(workspace_id,module_key,status) WHERE archived_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_business_records_payload_gin
  ON business_records USING GIN(payload);
CREATE TABLE IF NOT EXISTS import_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  module_key VARCHAR(60) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  total_rows INTEGER NOT NULL DEFAULT 0,
  imported_rows INTEGER NOT NULL DEFAULT 0,
  rejected_rows INTEGER NOT NULL DEFAULT 0,
  errors JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_import_jobs_workspace_created
  ON import_jobs(workspace_id,created_at DESC);

ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS tax_number VARCHAR(32) NOT NULL DEFAULT '';
ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS default_tax_rate NUMERIC(5,2) NOT NULL DEFAULT 0;
