import type { IResponse } from '$lib/server/response';

import * as ProductModules from '$lib/server/modules/products';
import { verifyUserSession } from '$lib/server/utils/session';

export async function GET({ cookies }) {
  const session = cookies.get('usersession');
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!verifyUserSession(session)) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const products = await ProductModules.readAllProductsWithType();
    const product_types = await ProductModules.readAllProductTypes();
    return Response.json({ message: '상품 목록 조회', products, product_types }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function POST({ cookies }) {
  const session = cookies.get('usersession');
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!verifyUserSession(session)) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return Response.json({ message: '상품 등록' }, { status: 200 });
}

export async function PUT({ cookies }) {
  const session = cookies.get('usersession');
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!verifyUserSession(session)) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE({ cookies }) {
  const session = cookies.get('usersession');
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!verifyUserSession(session)) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

export interface IAdminProductsGET extends IResponse {
  products: ProductModules.TReadAllProductsWithType;
  product_types: ProductModules.TreadAllProductTypes;
}
export interface IAdminProductsUnified extends IResponse {
  success: string;
}
