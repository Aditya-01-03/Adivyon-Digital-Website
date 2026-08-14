// Stricter CSP - allows unsafe-eval in development mode for React/Turbopack dev overlays
export const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'credentialless',
};

export const isDev = process.env.NODE_ENV === 'development';

export const CSP_HEADER = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' ${isDev ? 'ws: wss:' : ''};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${isDev ? '' : 'upgrade-insecure-requests;'}
`.replace(/\s{2,}/g, ' ').trim();

// Deep recursive sanitization
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key] as string) as any;
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null && !Array.isArray(sanitized[key])) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    } else if (Array.isArray(sanitized[key])) {
      sanitized[key] = (sanitized[key] as any[]).map(item =>
        typeof item === 'string' ? sanitizeString(item) :
        typeof item === 'object' && item !== null ? sanitizeObject(item) : item
      ) as any;
    }
  }
  return sanitized;
}

function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#96;');
}

// Check for malicious patterns in request paths
export function isMaliciousPath(pathname: string): boolean {
  const patterns = [
    /\.\.\//,           // Path traversal
    /%2e%2e/i,          // Encoded path traversal
    /%252e/i,           // Double-encoded
    /\.env/i,           // Env file access
    /\.git/i,           // Git directory access
    /\.htaccess/i,      // Apache config
    /wp-admin|wp-login/i, // WordPress probes
    /phpmyadmin/i,      // phpMyAdmin probes
    /\.(php|asp|aspx|jsp|cgi)$/i, // Script injection probes
  ];
  return patterns.some(p => p.test(pathname));
}

// Check for malicious bot user-agents
export function isMaliciousBot(userAgent: string): boolean {
  const bots = [
    /sqlmap/i, /nikto/i, /nmap/i, /masscan/i, /zgrab/i,
    /dirbuster/i, /gobuster/i, /wpscan/i, /nuclei/i,
    /havij/i, /acunetix/i, /nessus/i, /openvas/i,
  ];
  return bots.some(b => b.test(userAgent));
}
