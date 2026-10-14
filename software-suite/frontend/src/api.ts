const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/business-suite').replace(/\/$/, '');
export type ApiRecord = { id:string; data:Record<string, unknown>; createdAt:string; updatedAt:string };
export function getToken(){return sessionStorage.getItem('hbs_token')||'';}
export async function api<T=any>(path:string, init:RequestInit={}) : Promise<T> {
 const headers = new Headers(init.headers || {}); if(init.body && !headers.has('Content-Type')) headers.set('Content-Type','application/json');
 const token=getToken(); if(token) headers.set('Authorization',`Bearer ${token}`);
 let response:Response; try { response=await fetch(`${API_BASE}${path.startsWith('/')?path:`/${path}`}`,{...init,headers}); }
 catch { throw new Error(`Cannot reach the Happy Business Suite API at ${API_BASE}. Start the backend and check VITE_API_URL.`); }
 const body=await response.json().catch(()=>({})); if(!response.ok) throw new Error(body.message||`Request failed (${response.status}).`); return body as T;
}
export function industryCode(label:string){return ({'Clinic / Healthcare':'clinic','Hotels / Hospitality':'hotel','Courier / Logistics':'courier','Real Estate':'real_estate'} as Record<string,string>)[label]||'other';}
export function planCode(label:string){return label==='Growth'?'business':label==='Core'?'professional':'solo';}
