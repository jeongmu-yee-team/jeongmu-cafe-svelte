import type { Prisma } from '@prisma/client';

import client from '$lib/server/utils/prisma-client';

export async function getOrderItem() {
  return await client.order_item.findMany({
    select: {
      id: true,
      order_id: true,
      product_id: true,
      option_id: true,
      memo: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export type TOrderItem = Prisma.PromiseReturnType<typeof getOrderItem>;
