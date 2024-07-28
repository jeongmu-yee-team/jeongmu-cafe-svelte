import Ajv from 'ajv';

import { ProductSchema } from '$lib/schemas/product-schema';
import * as ProductModules from '$lib/server/modules/products';
import { checkSessionResponse, type IResponse } from '$lib/server/response';
import client from '$lib/server/utils/prisma-client';
import { supabaseStorageUpsert } from '$lib/server/utils/supabase-client';
import { dataURLtoFile, isDataURL } from '$lib/shared/utils';

export async function GET({ cookies, url }) {
  const checkSession = checkSessionResponse(cookies.get('usersession'));
  if (checkSession) {
    return Response.json({ ok: checkSession.ok, message: checkSession.message }, { status: checkSession.status });
  }

  const params = url.searchParams;
  const keyword = params.get('keyword');
  const type = Number(params.get('type'));
  const size = Number(params.get('size'));
  const page = Number(params.get('page'));
  const orderby = params.get('orderby');
  const sort = params.get('sort');

  const query = { keyword, type, size, page, orderby, sort };

  if (!ProductModules.validateSearchProps(query)) {
    return Response.json({ ok: false, message: '잘못된 쿼리 요청.' }, { status: 400 });
  }

  try {
    const products = await ProductModules.readAllProductsWithTypeBySearch(query);
    const product_type = await ProductModules.readAllProductType();
    const totalCount = await ProductModules.readAllProductCountBySearch(query);
    return Response.json({ ok: true, products, product_type, totalCount }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function POST({ cookies, request }) {
  const checkSession = checkSessionResponse(cookies.get('usersession'));
  if (checkSession) {
    return Response.json({ ok: checkSession.ok, message: checkSession.message }, { status: checkSession.status });
  }

  const bodyData = await request.json();

  const validate = new Ajv().compile(ProductSchema);
  if (!validate(bodyData)) {
    return Response.json({ ok: false, message: '잘못된 요청' }, { status: 400 });
  }

  try {
    const lastRow = await client.product.findMany({ select: { id: true }, orderBy: { id: 'desc' }, take: 1 });
    const lastId = lastRow[0].id + 1;

    if (isDataURL(bodyData.product_thumbnail_data_url)) {
      const file = dataURLtoFile(bodyData.product_thumbnail_data_url, bodyData.product_name);
      const result = await supabaseStorageUpsert(file, String(lastId));
      if (!result) {
        return Response.json({ ok: false, message: 'Invalid Cotent.' }, { status: 400 });
      }

      bodyData.product_thumbnail_data_url = result.publicUrl;
    }

    await ProductModules.createProduct({
      product_name: bodyData.product_name,
      product_thumbnail_url: bodyData.product_thumbnail_data_url,
      product_price: bodyData.product_price,
      product_type_id: bodyData.product_type_id,
    });
    return Response.json({ ok: true, message: '상품을 등록하였습니다.' }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}

export type TAdminProductsGET = IResponse & {
  products: ProductModules.TReadAllProductsWithType;
  product_type: ProductModules.TReadAllProductType;
  totalCount: number;
};
export type TAdminProductsPOST = IResponse;
