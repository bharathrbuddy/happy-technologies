import { describe, expect, it } from 'vitest';
import { customerSchema, loginSchema, registerSchema, workspaceSchema } from '../src/lib/validation.js';

describe('registration validation', () => {
  const valid = { fullName: 'Bharath Rao', email: 'bharath@example.com', password: 'Long-Unique-Password-123', industry: 'clinic', planCode: 'professional' };
  it('accepts valid registration with industry and plan', () => expect(registerSchema.safeParse(valid).success).toBe(true));
  it('rejects invalid email', () => expect(registerSchema.safeParse({ ...valid, email: 'bad' }).success).toBe(false));
  it('rejects short password', () => expect(registerSchema.safeParse({ ...valid, password: 'short' }).success).toBe(false));
  it('rejects unsupported industry and plan', () => {
    expect(registerSchema.safeParse({ ...valid, industry: 'unknown' }).success).toBe(false);
    expect(registerSchema.safeParse({ ...valid, planCode: 'free-forever' }).success).toBe(false);
  });
});

describe('other request validation', () => {
  it('accepts valid login and rejects missing password', () => {
    expect(loginSchema.safeParse({ email: 'a@b.com', password: 'x' }).success).toBe(true);
    expect(loginSchema.safeParse({ email: 'a@b.com', password: '' }).success).toBe(false);
  });
  it('requires a meaningful workspace name', () => {
    expect(workspaceSchema.safeParse({ name: 'Sunrise Clinic' }).success).toBe(true);
    expect(workspaceSchema.safeParse({ name: 'x' }).success).toBe(false);
  });
  it('validates customer phone and name', () => {
    expect(customerSchema.safeParse({ fullName: 'Priya Rao', phone: '+919876543210' }).success).toBe(true);
    expect(customerSchema.safeParse({ fullName: 'P', phone: '1' }).success).toBe(false);
  });
});
