import type { Prisma } from '@prisma/client';

import client from '$lib/server/utils/prisma-client';

export async function readUserById(user_id: string) {
  return client.admins.findFirst({
    where: { id: user_id },
  });
}

export type TreadUserById = Prisma.PromiseReturnType<typeof readUserById>;
