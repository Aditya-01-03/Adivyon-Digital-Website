const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('USERS_COUNT:', users.length);
  console.log('USERS:', users.map(u => ({ id: u.id, email: u.email, name: u.name, role: u.role })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
