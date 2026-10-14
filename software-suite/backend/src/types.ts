import type { Request } from 'express';
export interface AuthUser { id: string; email: string; fullName: string; }
export interface AuthedRequest extends Request { user?: AuthUser; workspaceId?: string; }
