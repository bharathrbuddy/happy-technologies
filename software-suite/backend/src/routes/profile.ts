import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db.js';
import type { AuthedRequest } from '../types.js';
const router=Router();
const schema=z.object({businessName:z.string().trim().min(2).max(200),businessType:z.string().max(160).optional().default(''),phone:z.string().max(40).optional().default(''),email:z.string().email().max(254).optional().or(z.literal('')).default(''),website:z.string().max(255).optional().default(''),addressLine1:z.string().max(255).optional().default(''),addressLine2:z.string().max(255).optional().default(''),city:z.string().max(120).optional().default(''),state:z.string().max(120).optional().default(''),postalCode:z.string().max(24).optional().default(''),country:z.string().trim().min(2).max(100),currency:z.enum(['INR','USD','GBP','EUR'])});
const select=`business_name AS "businessName",business_type AS "businessType",phone,email,website,address_line1 AS "addressLine1",address_line2 AS "addressLine2",city,state,postal_code AS "postalCode",country,currency`;
router.get('/business-profile',async(req:AuthedRequest,res,next)=>{try{const r=await pool.query(`SELECT ${select} FROM business_profiles WHERE workspace_id=$1`,[req.workspaceId]);res.json({profile:r.rows[0]||null});}catch(e){next(e);}});
router.put('/business-profile',async(req:AuthedRequest,res,next)=>{try{const p=schema.safeParse(req.body);if(!p.success){res.status(400).json({message:'Check the business name, email, country and other profile fields.'});return;}const d=p.data;const r=await pool.query(`INSERT INTO business_profiles(workspace_id,business_name,business_type,phone,email,website,address_line1,address_line2,city,state,postal_code,country,currency)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
ON CONFLICT(workspace_id) DO UPDATE SET business_name=EXCLUDED.business_name,business_type=EXCLUDED.business_type,phone=EXCLUDED.phone,email=EXCLUDED.email,website=EXCLUDED.website,address_line1=EXCLUDED.address_line1,address_line2=EXCLUDED.address_line2,city=EXCLUDED.city,state=EXCLUDED.state,postal_code=EXCLUDED.postal_code,country=EXCLUDED.country,currency=EXCLUDED.currency,updated_at=now()
RETURNING ${select}`,[req.workspaceId,d.businessName,d.businessType,d.phone,d.email||null,d.website,d.addressLine1,d.addressLine2,d.city,d.state,d.postalCode,d.country,d.currency]);res.json({profile:r.rows[0]});}catch(e){next(e);}});
export default router;
