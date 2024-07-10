import type { Prisma } from '@prisma/client';

import client from '$lib/server/utils/prisma-client';

export async function readUserById(user_id: string) {
  return client.admins.findFirst({
    where: { id: user_id },
  });
}

export async function readUserByAuth({ user_id, password }: { user_id: string; password: string }) {
  return client.admins.findFirst({
    where: { id: user_id, password: password },
    select: { created_at: true },
  });
}

export type TreadUserById = Prisma.PromiseReturnType<typeof readUserById>;
export type TreadUserByAuth = Prisma.PromiseReturnType<typeof readUserByAuth>;
