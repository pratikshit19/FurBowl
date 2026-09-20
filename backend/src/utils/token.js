import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/**
 * Generate access + refresh token pair for a user
 */
export function generateTokens(user) {
  const payload = { userId: user.id, role: user.role || 'CUSTOMER' };
  const secret = process.env.JWT_SECRET || 'furbowlisthebest';
  const refreshSecret = process.env.JWT_REFRESH_SECRET || secret || 'furbowlisthebestoutthere';

  const accessToken = jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRY || '15m',
  });

  const refreshToken = jwt.sign(payload, refreshSecret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
  });

  return { accessToken, refreshToken };
}

/**
 * Generate a 6-digit numeric OTP
 */
export function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * Verify a JWT access token
 */
export function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET || 'furbowlisthebest';
  return jwt.verify(token, secret);
}

