import { PrismaClient } from '@prisma/client';

import { PublicEnvConfig } from '@/config/public-env.config';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (PublicEnvConfig.node_env !== 'production') globalThis.prisma = db;
