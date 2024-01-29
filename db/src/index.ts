import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';

export const prisma = new PrismaClient();

export function getEnhancedPrisma(userId: number | undefined) {
  return enhance(prisma, { user: userId ? { id: userId } : undefined });
}
