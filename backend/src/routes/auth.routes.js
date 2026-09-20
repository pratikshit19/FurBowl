import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';
import { generateTokens, generateOtpCode } from '../utils/token.js';
import { sendOtp } from '../utils/sms.js';
import { rateLimit } from '../middleware/rate-limit.js';

const router = Router();

// In-memory OTP store (use Redis in production)
const otpStore = new Map();

// POST /api/v1/auth/send-otp
router.post('/send-otp', rateLimit({ windowMs: 15 * 60 * 1000, max: 5, key: (req) => `${req.ip}:${req.body.phone || ''}` }), async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Valid 10-digit phone number required' });
    }

    const otp = generateOtpCode();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(phone, { otp, expiresAt, attempts: 0 });

    // Always log OTP to console in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`\n  📱 [DEV OTP] Code for ${phone}: ${otp} (or enter default bypass: 123456)\n`);
    }

    // Send OTP via MSG91
    if (process.env.MSG91_AUTH_KEY) {
      try {
        await sendOtp(phone, otp);
      } catch (smsErr) {
        console.error(`Failed to send SMS to ${phone}:`, smsErr.message);
        if (process.env.NODE_ENV !== 'development') {
          throw smsErr;
        }
      }
    }

    res.json({ message: 'OTP sent', phone });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/auth/verify-otp
router.post('/verify-otp', rateLimit({ windowMs: 15 * 60 * 1000, max: 8, key: (req) => `${req.ip}:${req.body.phone || ''}` }), async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    const stored = otpStore.get(phone);

    if (!stored) {
      return res.status(400).json({ error: 'OTP not found or expired. Please request a new one.' });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP expired. Please request a new one.' });
    }

    stored.attempts += 1;
    if (stored.attempts > 3) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'Too many incorrect attempts. Please request a new OTP.' });
    }

    // Dev bypass: accept "123456" as valid OTP
    const isValid = otp === stored.otp || (process.env.NODE_ENV === 'development' && otp === '123456');
    if (!isValid) {
      return res.status(400).json({ error: 'Incorrect OTP' });
    }

    otpStore.delete(phone);

    // Find or create user
    let user = await prisma.user.findUnique({ where: { phone } });
    const isNewUser = !user || !user.name;
    if (!user) {
      user = await prisma.user.create({
        data: { phone, phoneVerified: true },
      });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        dogName: user.dogName || null,
        role: user.role,
        mostOrderedProduct: user.mostOrderedProduct || null,
        lastOrderDate: user.lastOrderDate || null,
        lastOrderSummary: user.lastOrderSummary || null,
        lastOrderStatus: user.lastOrderStatus || null,
      },
      token: accessToken,
      isNewUser,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/auth/register — Email & Password signup
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name: name ? name.trim() : null,
        emailVerified: true,
      },
    });

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        dogName: user.dogName || null,
        role: user.role,
        mostOrderedProduct: null,
        lastOrderDate: null,
        lastOrderSummary: null,
        lastOrderStatus: null,
      },
      token: accessToken,
      isNewUser: !user.name,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/auth/login — Email & Password login
router.post('/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        dogName: user.dogName || null,
        role: user.role,
        mostOrderedProduct: user.mostOrderedProduct || null,
        lastOrderDate: user.lastOrderDate || null,
        lastOrderSummary: user.lastOrderSummary || null,
        lastOrderStatus: user.lastOrderStatus || null,
      },
      token: accessToken,
      isNewUser: !user.name,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/auth/google — Google / Gmail OAuth Login
router.post('/google', async (req, res, next) => {
  try {
    const { credential, accessToken } = req.body;

    if (!credential && !accessToken) {
      return res.status(400).json({ error: 'Google credential or access token is required' });
    }

    let payload;

    if (credential) {
      // Verify via Google tokeninfo endpoint
      const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
      payload = await verifyRes.json();
      if (!verifyRes.ok || !payload.email) {
        return res.status(401).json({ error: payload.error_description || 'Invalid Google credential' });
      }
    } else if (accessToken) {
      // Verify via Google userinfo endpoint
      const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      payload = await userinfoRes.json();
      if (!userinfoRes.ok || !payload.email) {
        return res.status(401).json({ error: 'Invalid Google access token' });
      }
    }

    if (!payload || !payload.email) {
      return res.status(401).json({ error: 'Could not retrieve email from Google profile' });
    }

    const email = payload.email.toLowerCase().trim();
    const name = payload.name || payload.given_name || null;

    let user = await prisma.user.findUnique({ where: { email } });
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await prisma.user.create({
        data: {
          email,
          name,
          emailVerified: true,
          phoneVerified: false,
        },
      });
    } else {
      // Update name if not set yet, or ensure email is marked verified
      const updateData = {};
      if (!user.name && name) updateData.name = name;
      if (!user.emailVerified) updateData.emailVerified = true;

      if (Object.keys(updateData).length > 0) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: updateData,
        });
      }
    }

    const { accessToken: newAccessToken, refreshToken } = generateTokens(user);

    try {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    } catch (cookieErr) {
      console.warn('Cookie set warning:', cookieErr.message);
    }

    return res.json({
      user: {
        id: user.id,
        phone: user.phone || null,
        email: user.email,
        name: user.name || name || 'Pet Parent',
        dogName: user.dogName || null,
        role: user.role || 'CUSTOMER',
        mostOrderedProduct: user.mostOrderedProduct || null,
        lastOrderDate: user.lastOrderDate || null,
        lastOrderSummary: user.lastOrderSummary || null,
        lastOrderStatus: user.lastOrderStatus || null,
      },
      token: newAccessToken,
      isNewUser: isNewUser || !user.name,
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(500).json({ error: error.message || 'Google sign-in encountered an internal error.' });
  }
});

// POST /api/v1/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});

// GET /api/v1/auth/me — returns current user
router.get('/me', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const jwt = await import('jsonwebtoken');
    const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(401).json({ error: 'User not found' });

    res.json({
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        dogName: user.dogName || null,
        role: user.role,
        mostOrderedProduct: user.mostOrderedProduct || null,
        lastOrderDate: user.lastOrderDate || null,
        lastOrderSummary: user.lastOrderSummary || null,
        lastOrderStatus: user.lastOrderStatus || null,
      },
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    next(error);
  }
});

// PUT /api/v1/auth/profile — update current user profile (name, email, phone)
router.put('/profile', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const jwt = await import('jsonwebtoken');
    const secret = process.env.JWT_SECRET || 'furbowlisthebest';
    let decoded;
    try {
      decoded = jwt.default.verify(token, secret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Fallback verify for expired tokens to prevent session loss during profile edits
        decoded = jwt.default.verify(token, secret, { ignoreExpiration: true });
      } else {
        return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
      }
    }

    const { name, email, phone, dogName, password } = req.body;
    const cleanPhone = phone ? phone.replace(/\D/g, '') : (phone === null ? null : undefined);
    const cleanEmail = email ? email.toLowerCase().trim() : (email === null ? null : undefined);
    const cleanName = name ? name.trim() : (name === null ? null : undefined);
    const cleanDogName = dogName !== undefined ? (dogName ? dogName.trim() : null) : undefined;

    // 1. Check if phone is already linked to another user
    if (cleanPhone) {
      const existingPhoneUser = await prisma.user.findUnique({
        where: { phone: cleanPhone },
        include: {
          orders: { select: { id: true } },
          addresses: { select: { id: true } },
        },
      });

      if (existingPhoneUser && existingPhoneUser.id !== decoded.userId) {
        // If the other account has no email, it was created via phone OTP. Merge it into current account!
        if (!existingPhoneUser.email) {
          await prisma.order.updateMany({
            where: { userId: existingPhoneUser.id },
            data: { userId: decoded.userId },
          });
          await prisma.address.updateMany({
            where: { userId: existingPhoneUser.id },
            data: { userId: decoded.userId },
          });
          await prisma.cartItem.deleteMany({
            where: { userId: existingPhoneUser.id },
          });
          await prisma.wishlistItem.deleteMany({
            where: { userId: existingPhoneUser.id },
          });
          await prisma.user.delete({
            where: { id: existingPhoneUser.id },
          });
        } else {
          return res.status(400).json({
            error: `This mobile number is already linked to another account (${existingPhoneUser.email}).`,
          });
        }
      }
    }

    // 2. Check if email is already linked to another user
    if (cleanEmail) {
      const existingEmailUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
      if (existingEmailUser && existingEmailUser.id !== decoded.userId) {
        return res.status(400).json({
          error: 'This email address is already linked to another account.',
        });
      }
    }

    const updateData = {};
    if (cleanName !== undefined) updateData.name = cleanName;
    if (cleanEmail !== undefined) updateData.email = cleanEmail;
    if (cleanPhone !== undefined) updateData.phone = cleanPhone;
    if (cleanDogName !== undefined) updateData.dogName = cleanDogName;

    // 3. Update password if provided
    if (password && password.trim()) {
      if (password.trim().length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      }
      updateData.passwordHash = await bcrypt.hash(password.trim(), 10);
    }

    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: updateData,
    });

    const { accessToken: newAccessToken } = generateTokens(user);

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        dogName: user.dogName,
        role: user.role,
        mostOrderedProduct: user.mostOrderedProduct || null,
        lastOrderDate: user.lastOrderDate || null,
        lastOrderSummary: user.lastOrderSummary || null,
        lastOrderStatus: user.lastOrderStatus || null,
      },
      token: newAccessToken,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'The mobile number or email address is already registered to another account.',
      });
    }
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
    }
    next(error);
  }
});

export default router;
