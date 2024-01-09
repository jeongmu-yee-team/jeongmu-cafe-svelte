import client from '$lib/server/utils/prisma-client';
import type { IOrderSchema } from '$lib/server/schemas/order-schema';

interface IOrderSchemaProps extends IOrderSchema {
  order_id: number;
}

export function postOder(props: IOrderSchemaProps) {
  // return client.$transaction(async (tx) => {
  //   Promise.all(
  //   )
  //     await tx.orderItem.create({
  //       data: {
  //         order_id: 123,
  //       },
  //     });
  //   }
  // });
}
