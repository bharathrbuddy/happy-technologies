import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
  phone: z.string().trim().min(5).max(40).optional().default(''),
  industry: z.enum(['clinic', 'retail', 'real_estate', 'hotel', 'education', 'manufacturing', 'courier', 'other']),
  planCode: z.enum(['solo', 'professional', 'business']),
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(128),
});

export const workspaceSchema = z.object({
  name: z.string().trim().min(2).max(160),
  industry: z.enum(['clinic', 'retail', 'real_estate', 'hotel', 'education', 'manufacturing', 'courier', 'other']).optional(),
});

export const customerSchema = z.object({
  fullName: z.string().trim().min(2).max(160),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(254).optional().or(z.literal('')),
  companyName: z.string().trim().max(200).optional(),
});
