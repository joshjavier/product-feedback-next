import { cache } from 'react';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

export const getDb = cache(() => {
  const connectionString = process.env.DATABASE_URL ?? '';
  const adapter = new PrismaPg({ connectionString, maxUses: 1 });
  const prisma = new PrismaClient({ adapter });
  return prisma;
});
