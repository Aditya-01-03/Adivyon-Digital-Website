export function validateOrigin(request: Request, allowedOrigins: string[]): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  if (!origin && !referer) return false;
  
  const checkUrl = origin || (referer ? new URL(referer).origin : '');
  return allowedOrigins.some(allowed => checkUrl === allowed);
}

export function isMutatingMethod(method: string): boolean {
  return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());
}
