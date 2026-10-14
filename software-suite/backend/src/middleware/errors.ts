import type { ErrorRequestHandler } from 'express';
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Avoid returning stack traces or database details to clients.
  console.error('API error:', err instanceof Error ? err.message : 'Unknown error');
  res.status(500).json({ message: 'Something went wrong on our side. Please try again later.' });
};
