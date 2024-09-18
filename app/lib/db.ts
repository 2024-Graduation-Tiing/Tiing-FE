import { PrismaClient } from '@prisma/client';

//
//
//

const prismaClinetSingleton = () => {
  return new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
};

type PrismaClinetSingleton = ReturnType<typeof prismaClinetSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClinetSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClinetSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = prisma;
