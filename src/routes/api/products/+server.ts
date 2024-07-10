import type { IResponse } from '$src/lib/server/response';

import * as ProductModules from '$lib/server/modules/products';

export async function GET() {
  const products = await ProductModules.getProducts();
  const product_type = await ProductModules.getProductType();
  return Response.json({ ok: true, products, product_type }, { status: 200 });
}

export async function POST() {}

export interface IProductsGET extends IResponse {
  products: ProductModules.TProducts;
  product_type: ProductModules.TProductType;
  totalCount: number;
}
