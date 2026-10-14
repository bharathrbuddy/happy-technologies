import type { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import type { AuthedRequest, AuthUser } from '../types.js';
export async function authenticate(req: AuthedRequest,res: Response,next: NextFunction) {
  const header=req.header('authorization');
  if(!header?.startsWith('Bearer ')){res.status(401).json({message:'Please sign in to continue.'});return;}
  try {
    const secret=process.env.JWT_SECRET;
    if(!secret) throw new Error('JWT_SECRET is not configured');
    const decoded=jwt.verify(header.slice(7),secret) as AuthUser;
    const result=await pool.query('SELECT id, email, full_name AS "fullName" FROM users WHERE id=$1 AND is_active=true',[decoded.id]);
    if(!result.rowCount){res.status(401).json({message:'Your session is no longer valid. Please sign in again.'});return;}
    req.user=result.rows[0] as AuthUser;next();
  } catch {res.status(401).json({message:'Your session is invalid or has expired. Please sign in again.'});}
}
export async function requireWorkspace(req: AuthedRequest,res: Response,next: NextFunction) {
  try {
    const id=req.user?.id;
    if(!id){res.status(401).json({message:'Please sign in to continue.'});return;}
    const result=await pool.query(
      `SELECT w.id FROM workspaces w JOIN workspace_memberships m ON m.workspace_id=w.id
       WHERE m.user_id=$1 AND m.is_active=true ORDER BY m.created_at ASC LIMIT 1`,[id]);
    if(!result.rowCount){res.status(409).json({message:'Create a workspace before using this feature.',code:'WORKSPACE_REQUIRED'});return;}
    req.workspaceId=result.rows[0].id;next();
  } catch {next(new Error('Could not verify workspace membership.'));}
}
