import type { Prisma } from '@prisma/client';

import client from '$lib/server/utils/prisma-client';

const ProductOrderBy = ['product_name', 'created_at'] as const;
export type ProductOrderByType = (typeof ProductOrderBy)[number];

const ProductSort = ['asc', 'desc'] as const;
export type ProductSortType = (typeof ProductSort)[number];

export interface IProductsWithTypeBySearchProps {
  keyword?: string;
  type?: number | 'none';
  size?: number;
  page?: number;
  orderby?: ProductOrderByType;
  sort?: ProductSortType;
}

export function validateSearchProps(props: unknown): props is IProductsWithTypeBySearchProps {
  const { keyword, size, page, orderby, sort } = props as IProductsWithTypeBySearchProps;

  if (!(typeof keyword === 'string') || !(typeof size === 'number' && !isNaN(size)) || !(typeof page === 'number' && !isNaN(page))) {
    return false;
  }
  if (!(typeof orderby === 'string') || !ProductOrderBy.includes(orderby as ProductOrderByType)) {
    return false;
  }
  if (!(typeof sort === 'string') || !ProductSort.includes(sort as ProductSortType)) {
    return false;
  }
  return true;
}

interface ICreateProductProps {
  product_name: string;
  product_thumbnail_url: string;
  product_price: number;
  product_type_id: number;
}

export async function createProduct({ product_name, product_thumbnail_url, product_price, product_type_id }: ICreateProductProps) {
  const lastRow = await client.product.findMany({ select: { sequence: true }, orderBy: { sequence: 'desc' }, take: 1 });
  const lastSequence = lastRow[0].sequence;

  await client.product.create({
    data: {
      product_name,
      product_thumbnail_url,
      product_price,
      product_type_id,
      sequence: lastSequence ? lastSequence + 1 : 0,
    },
  });
}

export async function readAllProductsWithTypeBySearch({
  keyword = '',
  type = 'none',
  size = 10,
  page = 1,
  orderby = 'product_name',
  sort = 'desc',
}: IProductsWithTypeBySearchProps) {
  const whereInput: Prisma.productWhereInput = {};
  whereInput.OR = [{ product_name: { contains: keyword } }];
  if (type && type !== 'none') {
    whereInput.product_type_id = type;
  }

  return await client.product.findMany({
    select: {
      id: true,
      product_name: true,
      product_thumbnail_url: true,
      product_price: true,
      product_type_id: true,
      created_at: true,
      sequence: true,
      is_display: true,
      product_type: { select: { id: true, type_name: true } },
    },
    where: whereInput,
    orderBy: { [orderby]: sort },
    skip: size * (page - 1),
    take: size,
  });
}

export async function readAllProductCountBySearch({ keyword = '', type }: IProductsWithTypeBySearchProps) {
  const whereInput: Prisma.productWhereInput = {};
  whereInput.OR = [{ product_name: { contains: keyword } }];
  if (type && type !== 'none') {
    whereInput.product_type_id = type;
  }
  return await client.product.count({ where: whereInput });
}

export async function readProductById(product_id: number) {
  return await client.product.findFirst({
    select: {
      id: true,
      product_name: true,
      product_thumbnail_url: true,
      product_price: true,
      product_type: { select: { id: true, type_name: true } },
    },
    where: { id: product_id },
  });
}

export async function readAllProducts() {
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

export async function readAllProductType() {
  return await client.product_type.findMany({
    select: { id: true, type_name: true },
    orderBy: { id: 'asc' },
  });
}

export async function updateProductIsDisplay(product_id: number, is_display: boolean) {
  await client.product.update({
    data: { is_display },
    where: { id: product_id },
  });
}

interface IUpdateProductProps {
  id: number;
  product_name: string;
  product_thumbnail_url: string;
  product_price: number;
  product_type_id: number;
}

export async function updateProduct({ id, product_name, product_thumbnail_url, product_price, product_type_id }: IUpdateProductProps) {
  await client.product.update({
    data: {
      product_name,
      product_thumbnail_url,
      product_price,
      product_type_id,
    },
    where: { id },
  });
}

export async function deleteProduct(product_id: number) {
  await client.product.delete({ where: { id: product_id } });
}

export type TReadAllProductsWithType = Prisma.PromiseReturnType<typeof readAllProductsWithTypeBySearch>;
export type TReadProductById = Prisma.PromiseReturnType<typeof readProductById>;
export type TReadAllProducts = Prisma.PromiseReturnType<typeof readAllProducts>;
export type TReadAllProductType = Prisma.PromiseReturnType<typeof readAllProductType>;
