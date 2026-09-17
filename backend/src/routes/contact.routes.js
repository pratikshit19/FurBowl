import { Router } from 'express';
import prisma from '../config/database.js';
import { rateLimit } from '../middleware/rate-limit.js';

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', rateLimit({ windowMs: 60 * 60 * 1000, max: 8 }), async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name?.trim() || !emailPattern.test(email || '') || !message?.trim()) {
      return res.status(400).json({ error: 'Name, a valid email address, and a message are required.' });
    }
    await prisma.contactSubmission.create({
      data: { name: name.trim(), email: email.toLowerCase().trim(), phone: phone?.trim() || null, subject: subject?.trim() || null, message: message.trim() },
    });
    res.status(201).json({ message: 'Thanks — your message has been received.' });
  } catch (error) { next(error); }
});

router.post('/newsletter', rateLimit({ windowMs: 60 * 60 * 1000, max: 5 }), async (req, res, next) => {
  try {
    const { email, consent } = req.body;
    if (!consent || !emailPattern.test(email || '')) return res.status(400).json({ error: 'Please provide a valid email address and consent to receive updates.' });
    await prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase().trim() },
      create: { email: email.toLowerCase().trim(), marketingConsentAt: new Date() },
      update: { isSubscribed: true, marketingConsentAt: new Date(), unsubscribedAt: null },
    });
    res.status(201).json({ message: 'You’re on the FurBowl list.' });
  } catch (error) { next(error); }
});

export default router;
