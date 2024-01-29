import type { PrismaClient } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      db: PrismaClient;
    }
  }
}
