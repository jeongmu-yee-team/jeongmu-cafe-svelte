import type { IResponse } from '$lib/server/response';

import * as ProductModules from '$lib/server/modules/products';

export async function GET() {
  const products = await ProductModules.readAllProducts();
  const product_type = await ProductModules.readAllProductType();
  return Response.json({ ok: true, products, product_type }, { status: 200 });
}

export async function POST() {}

export interface IProductsGET extends IResponse {
  products: ProductModules.TReadAllProducts;
  product_type: ProductModules.TReadAllProductType;
}
