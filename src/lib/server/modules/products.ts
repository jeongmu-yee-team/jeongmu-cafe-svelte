import type { Prisma } from '@prisma/client';
import client from '$lib/server/utils/prisma-client';

export async function getProducts() {
  const [products, totalCount] = await client.$transaction([
    client.product.findMany({
      select: {
        product_name: true,
        product_thumbnail_url: true,
        product_price: true,
        product_type_id: true,
      },
    }),
    client.product.count(),
  ]);

  return { products, totalCount };
}

export async function getProductType() {
  return await client.productType.findMany({
    select: { id: true, type_name: true },
    orderBy: { id: 'asc' },
  });
}

/* Return Type */
export type TProducts = Prisma.PromiseReturnType<typeof getProducts>;
export type TProductType = Prisma.PromiseReturnType<typeof getProductType>;
