ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(40) NOT NULL DEFAULT '';
ALTER TABLE subscriptions ALTER COLUMN trial_ends_at SET DEFAULT (NOW() + INTERVAL '14 days');
CREATE TABLE IF NOT EXISTS module_records (id UUID PRIMARY KEY DEFAULT gen_random_uuid(),workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,module_key VARCHAR(60) NOT NULL,record_data JSONB NOT NULL DEFAULT '{}'::jsonb,created_by UUID REFERENCES users(id),archived_at TIMESTAMPTZ,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
CREATE INDEX IF NOT EXISTS idx_module_records_workspace_module_created ON module_records(workspace_id,module_key,created_at DESC) WHERE archived_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_module_records_data_gin ON module_records USING GIN(record_data);
CREATE TABLE IF NOT EXISTS import_batches (id UUID PRIMARY KEY DEFAULT gen_random_uuid(),workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,file_name VARCHAR(255) NOT NULL,target_module VARCHAR(60) NOT NULL,imported_count INTEGER NOT NULL DEFAULT 0,created_by UUID REFERENCES users(id),created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
