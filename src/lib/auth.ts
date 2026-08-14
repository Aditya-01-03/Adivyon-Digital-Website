import { SignJWT, jwtVerify } from 'jose';

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
};

export async function signAccessToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setAudience('adivyon-admin')
    .setIssuer('adivyon-api')
    .setExpirationTime('10m')
    .sign(getSecret());
}

const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'fallback-refresh-secret');

export async function signRefreshToken(userId: string) {
  return new SignJWT({ sub: userId, userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setAudience('adivyon-admin')
    .setIssuer('adivyon-api')
    .setExpirationTime('7d')
    .sign(REFRESH_SECRET);
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET, {
      audience: 'adivyon-admin',
      issuer: 'adivyon-api',
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      audience: 'adivyon-admin',
      issuer: 'adivyon-api',
    });
    return payload;
  } catch (error) {
    return null;
  }
}
