import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/hash';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hashPassword('admin123');

  await prisma.user.upsert({
    where: { email: 'admin@adivyondigital.com' },
    update: {},
    create: {
      email: 'admin@adivyondigital.com',
      name: 'Admin',
      password: adminPassword,
      role: 'admin',
    },
  });

  const settings = [
    { key: 'siteName', value: 'Adivyon Digital' },
    { key: 'contactEmail', value: 'hello@adivyondigital.com' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
