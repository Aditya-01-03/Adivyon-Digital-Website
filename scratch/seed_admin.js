const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    data,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 310000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    true,
    ['sign']
  );
  
  const exportedKey = await crypto.subtle.exportKey('raw', key);
  const hashBuffer = new Uint8Array(exportedKey);
  
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(hashBuffer).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `${saltHex}:${hashHex}`;
}

async function main() {
  const email = 'admin@adivyon.com';
  const plainPassword = 'Admin@2026';
  const hashedPassword = await hashPassword(plainPassword);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      name: 'System Admin',
      role: 'admin',
    },
    create: {
      email,
      password: hashedPassword,
      name: 'System Admin',
      role: 'admin',
    },
  });

  console.log('Seeded Admin Account successfully:');
  console.log('Email:', user.email);
  console.log('Password:', plainPassword);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
