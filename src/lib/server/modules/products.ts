import type { Prisma } from '@prisma/client';
import client from '$lib/server/utils/prisma-client';

export function getProducts() {
  return client.$transaction([
    client.product.findMany({
      select: {
        product_name: true,
        product_thumbnail_url: true,
        product_price: true,
        product_type: true,
      },
    }),
    client.product.count(),
  ]);
}

export function getProductType() {
  return client.productType.findMany();
}

/* Return Type */
export type TProducts = Prisma.PromiseReturnType<typeof getProducts>;
export type TProductType = Prisma.PromiseReturnType<typeof getProductType>;
