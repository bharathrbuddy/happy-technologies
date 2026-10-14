import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db.js';
import type { AuthedRequest } from '../types.js';
const router = Router();
const allowed = new Set(['appointments','invoices','shipments','tracking','deliveries','reservations','rooms','properties','site_visits','deals','payments','imports','patients','guests','leads','customers','enquiries']);
const recordSchema = z.record(z.unknown()).refine(v => Object.keys(v).length > 0 && Object.keys(v).length <= 100, 'Record fields are required.');
function moduleName(value: string) { return value.toLowerCase().replace(/[^a-z0-9_-]/g, '_').slice(0,60); }
router.get('/records/:module', async (req: AuthedRequest, res, next) => {
 try { const key=moduleName(req.params.module); if(!allowed.has(key)){res.status(400).json({message:'Unsupported module.'});return;}
  const q=String(req.query.q||'').trim().slice(0,100); const values:any[]=[req.workspaceId,key]; let sql=`SELECT id,record_data AS data,created_at AS "createdAt",updated_at AS "updatedAt" FROM module_records WHERE workspace_id=$1 AND module_key=$2 AND archived_at IS NULL`;
  if(q){values.push(`%${q}%`);sql+=` AND record_data::text ILIKE $${values.length}`;}
  sql+=' ORDER BY created_at DESC LIMIT 500'; const r=await pool.query(sql,values);res.json({items:r.rows});
 } catch(e){next(e)}
});
router.post('/records/:module', async (req: AuthedRequest,res,next)=>{
 try { const key=moduleName(req.params.module);if(!allowed.has(key)){res.status(400).json({message:'Unsupported module.'});return;}const parsed=recordSchema.safeParse(req.body.data??req.body);if(!parsed.success){res.status(400).json({message:'Provide valid record fields.'});return;}
  const r=await pool.query(`INSERT INTO module_records(workspace_id,module_key,record_data,created_by) VALUES($1,$2,$3::jsonb,$4) RETURNING id,record_data AS data,created_at AS "createdAt",updated_at AS "updatedAt"`,[req.workspaceId,key,JSON.stringify(parsed.data),req.user?.id]);res.status(201).json({item:r.rows[0]});
 }catch(e){next(e)}
});
router.post('/imports',async(req:AuthedRequest,res,next)=>{
 const client=await pool.connect();try{const body=z.object({fileName:z.string().min(1).max(255),module:z.string().min(1).max(60),records:z.array(z.record(z.string())).min(1).max(5000)}).safeParse(req.body);
  if(!body.success){res.status(400).json({message:'Provide a file name, module and between 1 and 5000 valid rows.'});return;}
  const key=moduleName(body.data.module);if(!allowed.has(key)){res.status(400).json({message:'Unsupported import module.'});return;}
  await client.query('BEGIN');for(const row of body.data.records){
   const normalized=new Map(Object.entries(row).map(([k,v])=>[k.toLowerCase().replace(/[^a-z0-9]/g,''),v]));
   const pick=(keys:string[])=>{for(const k of keys){const v=normalized.get(k);if(v&&String(v).trim())return String(v).trim()}return ''};
   if(['customers','patients','guests','clients'].includes(key)){
    const name=pick(['fullname','customername','patientname','guestname','clientname','name','customer','patient','guest','client'])||'Imported record';
    const phone=pick(['phone','phonenumber','mobile','mobilenumber','contactnumber'])||'Imported';
    const email=pick(['email','emailaddress']);const company=pick(['company','companyname','business']);
    await client.query('INSERT INTO customers(workspace_id,full_name,phone,email,company_name,created_by) VALUES($1,$2,$3,$4,$5,$6)',[req.workspaceId,name.slice(0,160),phone.slice(0,40),email||null,company||null,req.user?.id]);
   } else if(key==='enquiries'||key==='leads'){
    const title=pick(['title','enquiry','enquirytitle','details','subject','leadname','name'])||'Imported enquiry';
    await client.query("INSERT INTO enquiries(workspace_id,title,status,source,notes,created_by) VALUES($1,$2,'new','other',$3,$4)",[req.workspaceId,title.slice(0,240),JSON.stringify(row),req.user?.id]);
   } else {
    await client.query('INSERT INTO module_records(workspace_id,module_key,record_data,created_by) VALUES($1,$2,$3::jsonb,$4)',[req.workspaceId,key,JSON.stringify(row),req.user?.id]);
   }
  }
  const batch=await client.query('INSERT INTO import_batches(workspace_id,file_name,target_module,imported_count,created_by) VALUES($1,$2,$3,$4,$5) RETURNING id,file_name AS "fileName",target_module AS module,imported_count AS "importedCount",created_at AS "createdAt"',[req.workspaceId,body.data.fileName,key,body.data.records.length,req.user?.id]);await client.query('COMMIT');res.status(201).json({batch:batch.rows[0]});
 }catch(e){try{await client.query('ROLLBACK')}catch{};next(e)}finally{client.release()}
});
router.get('/dashboard/summary',async(req:AuthedRequest,res,next)=>{try{
 const [customers,enquiries,invoices,appointments,shipments]=await Promise.all([
  pool.query("SELECT count(*)::int AS count FROM customers WHERE workspace_id=$1 AND archived_at IS NULL",[req.workspaceId]),
  pool.query("SELECT count(*)::int AS count FROM enquiries WHERE workspace_id=$1 AND archived_at IS NULL",[req.workspaceId]),
  pool.query("SELECT count(*)::int AS count,COALESCE(sum(NULLIF(regexp_replace(record_data->>'amount','[^0-9.]','','g'),'')::numeric),0)::numeric AS total FROM module_records WHERE workspace_id=$1 AND module_key='invoices' AND archived_at IS NULL",[req.workspaceId]),
  pool.query("SELECT count(*)::int AS count FROM module_records WHERE workspace_id=$1 AND module_key IN ('appointments','reservations','site_visits') AND archived_at IS NULL",[req.workspaceId]),
  pool.query("SELECT count(*)::int AS count FROM module_records WHERE workspace_id=$1 AND module_key='shipments' AND archived_at IS NULL",[req.workspaceId])
 ]);res.json({customers:customers.rows[0].count,enquiries:enquiries.rows[0].count,invoices:invoices.rows[0].count,invoiceAmount:invoices.rows[0].total,appointments:appointments.rows[0].count,shipments:shipments.rows[0].count});
 }catch(e){next(e)}});
router.get('/imports/history',async(req:AuthedRequest,res,next)=>{try{const r=await pool.query('SELECT id,file_name AS "fileName",target_module AS module,imported_count AS "importedCount",created_at AS "createdAt" FROM import_batches WHERE workspace_id=$1 ORDER BY created_at DESC LIMIT 100',[req.workspaceId]);res.json({items:r.rows})}catch(e){next(e)}});
export default router;
