import type { Prisma } from '@prisma/client';
import client from '$lib/server/utils/prisma-client';

export async function getProducts() {
  return await client.product.findMany({
    select: {
      id: true,
      product_name: true,
      product_thumbnail_url: true,
      product_price: true,
      product_type_id: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export async function getProductType() {
  return await client.product_type.findMany({
    select: { id: true, type_name: true },
    orderBy: { id: 'asc' },
  });
}

/* Return Type */
export type TProducts = Prisma.PromiseReturnType<typeof getProducts>;
export type TProductType = Prisma.PromiseReturnType<typeof getProductType>;
