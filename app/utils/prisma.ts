import { PrismaClient } from '@prisma/client';

import { EnvConfig } from '@/config/env.config';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (EnvConfig.node_env !== 'production') globalThis.prisma = db;
