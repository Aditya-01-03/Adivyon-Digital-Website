// Basic in-memory rate limiting for Edge Middleware
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
let gcCounter = 0;

export const RATE_LIMITS = {
  API: { limit: 100, windowMs: 60 * 1000 },
  LOGIN: { limit: 5, windowMs: 15 * 60 * 1000 },
  ADMIN_PAGE: { limit: 50, windowMs: 60 * 1000 },
  FORGOT_PASSWORD: { limit: 3, windowMs: 60 * 60 * 1000 },
  CONTACT_FORM: { limit: 5, windowMs: 15 * 60 * 1000 },
};

export function checkRateLimit(
  ip: string,
  type: keyof typeof RATE_LIMITS = 'API'
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const { limit, windowMs } = RATE_LIMITS[type];
  const key = `${ip}:${type}`;

  const current = rateLimitMap.get(key);

  if (!current || now - current.timestamp > windowMs) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
  }

  current.count++;
  
  gcCounter++;
  if (gcCounter >= 100) {
    gcCounter = 0;
    for (const [k, v] of rateLimitMap.entries()) {
      if (now - v.timestamp > Math.max(...Object.values(RATE_LIMITS).map(r => r.windowMs))) {
        rateLimitMap.delete(k);
      }
    }
  }

  return {
    success: current.count <= limit,
    limit,
    remaining: Math.max(0, limit - current.count),
    reset: current.timestamp + windowMs,
  };
}

export function getRateLimitHeaders(limitInfo: ReturnType<typeof checkRateLimit>) {
  return {
    'X-RateLimit-Limit': limitInfo.limit.toString(),
    'X-RateLimit-Remaining': limitInfo.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(limitInfo.reset / 1000).toString(),
  };
}
