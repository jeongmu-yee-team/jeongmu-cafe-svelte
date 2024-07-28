import Ajv from 'ajv';

import { PATCHProductsSchema, ProductSchema } from '$lib/schemas/product-schema';
import * as ProductModules from '$lib/server/modules/products';
import { checkSessionResponse, type IResponse } from '$lib/server/response';
import { supabaseStorageUpsert } from '$lib/server/utils/supabase-client';
import { dataURLtoFile, isDataURL } from '$lib/shared/utils';

export async function GET({ cookies, params }) {
  const checkSession = checkSessionResponse(cookies.get('usersession'));
  if (checkSession) {
    return Response.json({ ok: checkSession.ok, message: checkSession.message }, { status: checkSession.status });
  }

  const productId = Number(params.id);
  if (isNaN(productId)) {
    return Response.json({ ok: false, message: '잘못된 요청' }, { status: 400 });
  }

  try {
    const product = await ProductModules.readProductById(productId);
    return Response.json({ ok: true, product }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function PUT({ cookies, request, params }) {
  const checkSession = checkSessionResponse(cookies.get('usersession'));
  if (checkSession) {
    return Response.json({ ok: checkSession.ok, message: checkSession.message }, { status: checkSession.status });
  }

  const product_id = Number(params.id);
  if (isNaN(product_id)) {
    return Response.json({ ok: false, message: '잘못된 요청' }, { status: 400 });
  }

  const bodyData = await request.json();
  const validate = new Ajv().compile(ProductSchema);
  if (!validate(bodyData)) {
    return Response.json({ ok: false, message: '잘못된 요청' }, { status: 400 });
  }

  try {
    const product = await ProductModules.readProductById(product_id);
    if (!product) {
      return Response.json({ ok: false, message: '해당 상품을 찾을 수 없습니다.' }, { status: 404 });
    }

    if (isDataURL(bodyData.product_thumbnail_data_url)) {
      const file = dataURLtoFile(bodyData.product_thumbnail_data_url, bodyData.product_name);
      const result = await supabaseStorageUpsert(file, String(product_id));
      if (!result) {
        return Response.json({ ok: false, message: 'Invalid Cotent.' }, { status: 400 });
      }

      bodyData.product_thumbnail_data_url = result.publicUrl;
    }

    await ProductModules.updateProduct({
      id: product_id,
      product_name: bodyData.product_name,
      product_thumbnail_url: bodyData.product_thumbnail_data_url,
      product_price: bodyData.product_price,
      product_type_id: bodyData.product_type_id,
    });
    return Response.json({ ok: true, message: '상품을 수정하였습니다.' }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function PATCH({ cookies, params, request }) {
  const checkSession = checkSessionResponse(cookies.get('usersession'));
  if (checkSession) {
    return Response.json({ ok: checkSession.ok, message: checkSession.message }, { status: checkSession.status });
  }

  const productId = Number(params.id);
  if (isNaN(productId)) {
    return Response.json({ ok: false, message: '잘못된 요청' }, { status: 400 });
  }

  const bodyData = await request.json();
  const validate = new Ajv().compile(PATCHProductsSchema);
  if (!validate(bodyData)) {
    return Response.json({ ok: false, message: '잘못된 요청' }, { status: 400 });
  }

  try {
    await ProductModules.updateProductIsDisplay(productId, bodyData.is_display);
    return Response.json({ ok: true, message: '상품의 판매상태를 변경하였습니다.' }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function DELETE({ cookies, params }) {
  const checkSession = checkSessionResponse(cookies.get('usersession'));
  if (checkSession) {
    return Response.json({ ok: checkSession.ok, message: checkSession.message }, { status: checkSession.status });
  }

  const productId = Number(params.id);
  if (isNaN(productId)) {
    return Response.json({ ok: false, message: '잘못된 요청' }, { status: 400 });
  }

  try {
    await ProductModules.deleteProduct(productId);
    return Response.json({ ok: true, message: '상품을 삭제하였습니다.' }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}
export type TAdminProductGET = IResponse & {
  product: ProductModules.TReadProductById;
};
export type TAdminProductPUT = IResponse;
export type TAdminProductPATCH = IResponse;
export type TAdminProductDELETE = IResponse;
