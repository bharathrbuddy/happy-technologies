import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../lib/validation.js';
import { pool } from '../db.js';
const router=Router();
const industryMap:Record<string,string>={clinic:'clinic',retail:'retail',real_estate:'real_estate',hotel:'hotel',education:'education',manufacturing:'manufacturing',courier:'courier',other:'other'};
function signToken(user:{id:string;email:string;fullName:string}) {
 const secret=process.env.JWT_SECRET;if(!secret||secret.length<32)throw new Error('JWT_SECRET must contain at least 32 characters');
 return jwt.sign({id:user.id,email:user.email,fullName:user.fullName},secret,{expiresIn:'2h',issuer:'happy-business-suite'});
}
router.post('/register',async(req,res,next)=>{
 const client=await pool.connect();
 try {
  const parsed=registerSchema.safeParse(req.body);
  if(!parsed.success){res.status(400).json({message:'Check your name, email, password, industry and plan. Password must contain at least 8 characters.'});return;}
  const {fullName,email,password,industry,planCode,phone}=parsed.data; const normalized=email.toLowerCase();
  await client.query('BEGIN');
  const exists=await client.query('SELECT 1 FROM users WHERE email=$1',[normalized]);
  if(exists.rowCount){await client.query('ROLLBACK');res.status(409).json({message:'An account with this email already exists. Sign in instead.'});return;}
  const hash=await bcrypt.hash(password,12);
  const result=await client.query('INSERT INTO users(full_name,email,password_hash,phone,onboarding_industry,selected_plan_code) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,email,full_name AS "fullName"',[fullName,normalized,hash,phone,industryMap[industry]||'other',planCode]);
  const user=result.rows[0];
  const ws=await client.query('INSERT INTO workspaces(name,industry,created_by) VALUES($1,$2,$3) RETURNING id,name,industry,code',[`${fullName}'s Workspace`,industryMap[industry]||'other',user.id]);
  await client.query("INSERT INTO workspace_memberships(workspace_id,user_id,role) VALUES($1,$2,'owner')",[ws.rows[0].id,user.id]);
  await client.query("INSERT INTO business_profiles(workspace_id,business_name,phone,email,country,currency) VALUES($1,$2,$3,$4,'India','INR')",[ws.rows[0].id,`${fullName}'s Business`,phone,normalized]);
  await client.query(
  `INSERT INTO subscriptions
    (workspace_id, plan_code, status, trial_started_at, trial_ends_at)
   VALUES (
     $1,
     $2::varchar,
     CASE WHEN $2::text = 'solo'
       THEN 'trial'
       ELSE 'pending_payment'
     END,
     NOW(),
     NOW() + INTERVAL '14 days'
   )`,
  [ws.rows[0].id, planCode]
);
  await client.query('COMMIT');
  res.status(201).json({message:'Account and workspace created.',token:signToken(user),user:{id:user.id,email:user.email,fullName:user.fullName,phone},workspace:ws.rows[0],hasWorkspace:true});
 }catch(e){try{await client.query('ROLLBACK')}catch{};next(e)}finally{client.release()}
});
router.post('/login',async(req,res,next)=>{try{
 const parsed=loginSchema.safeParse(req.body);if(!parsed.success){res.status(400).json({message:'Enter a valid email address and password.'});return;}
 const result=await pool.query('SELECT id,email,full_name AS "fullName",phone,password_hash,is_active FROM users WHERE email=$1',[parsed.data.email.toLowerCase()]);
 const user=result.rows[0];if(!user||!user.is_active||!await bcrypt.compare(parsed.data.password,user.password_hash)){res.status(401).json({message:'Email or password is incorrect.'});return;}
 const workspace=await pool.query('SELECT w.id,w.name,w.industry,w.code,s.plan_code AS "planCode",s.status AS "subscriptionStatus",s.trial_ends_at AS "trialEndsAt" FROM workspaces w JOIN workspace_memberships m ON m.workspace_id=w.id LEFT JOIN subscriptions s ON s.workspace_id=w.id WHERE m.user_id=$1 AND m.is_active=true ORDER BY m.created_at ASC LIMIT 1',[user.id]);
 res.json({token:signToken(user),user:{id:user.id,email:user.email,fullName:user.fullName,phone:user.phone},workspace:workspace.rows[0]||null,hasWorkspace:Boolean(workspace.rowCount)});
 }catch(e){next(e)}});
export default router;
