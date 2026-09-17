const buckets = new Map();

/** A small safe default. Replace with a shared Redis limiter when scaling horizontally. */
export function rateLimit({ windowMs, max, key = (req) => req.ip }) {
  return (req, res, next) => {
    const now = Date.now();
    const bucketKey = `${req.path}:${key(req)}`;
    const bucket = buckets.get(bucketKey);
    const active = !bucket || bucket.resetAt <= now ? { count: 0, resetAt: now + windowMs } : bucket;
    active.count += 1;
    buckets.set(bucketKey, active);
    if (active.count > max) {
      res.set('Retry-After', String(Math.ceil((active.resetAt - now) / 1000)));
      return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
    }
    next();
  };
}
