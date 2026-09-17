import { verifyAccessToken } from '../utils/token.js';

export function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : req.cookies?.accessToken || null;
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    req.userId = verifyAccessToken(token).userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Your session has expired. Please log in again.' });
  }
}
