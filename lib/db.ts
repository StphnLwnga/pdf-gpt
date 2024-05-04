import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Appending prisma client to globalThis prevents creation on a new PrismaClient on every hot reload
// globalThis is unaffacted by hot reload
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;