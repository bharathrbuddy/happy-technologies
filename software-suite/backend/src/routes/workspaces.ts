import { Router } from 'express';
import { workspaceSchema } from '../lib/validation.js';
import { pool } from '../db.js';
import type { AuthedRequest } from '../types.js';
const router=Router();
router.post('/',async(req:AuthedRequest,res,next)=>{const client=await pool.connect();try{
 const parsed=workspaceSchema.safeParse(req.body);if(!parsed.success){res.status(400).json({message:'Enter a workspace name and select a valid industry.'});return;}
 if(!req.user){res.status(401).json({message:'Please sign in.'});return;}
 await client.query('BEGIN');
 const preferences=await client.query('SELECT onboarding_industry,selected_plan_code FROM users WHERE id=$1',[req.user.id]);
 const industry=parsed.data.industry ?? preferences.rows[0]?.onboarding_industry ?? 'other';
 const planCode=preferences.rows[0]?.selected_plan_code ?? 'solo';
 const created=await client.query('INSERT INTO workspaces(name,industry,created_by) VALUES($1,$2,$3) RETURNING id,name,industry,code',[parsed.data.name,industry,req.user.id]);
 await client.query('INSERT INTO workspace_memberships(workspace_id,user_id,role) VALUES($1,$2,$3)',[created.rows[0].id,req.user.id,'owner']);
 await client.query('INSERT INTO business_profiles(workspace_id,business_name,country,currency) VALUES($1,$2,$3,$4)',[created.rows[0].id,parsed.data.name,'India','INR']);
 await client.query("INSERT INTO subscriptions(workspace_id,plan_code,status,trial_started_at,trial_ends_at) VALUES($1,$2,'trial',NOW(),NOW() + INTERVAL '1 day')",[created.rows[0].id,planCode]);
 await client.query('COMMIT');res.status(201).json({workspace:created.rows[0]});
 }catch(e){await client.query('ROLLBACK');next(e);}finally{client.release();}});
export default router;
