export type ProductsServerSideProps = {
  keyword: string;
  type: string;
  size: string;
  page: string;
  orderby: string;
  sort: string;
};

export function load({ url }) {
  const keyword = url.searchParams.get('keyword') || '';
  const type = url.searchParams.get('type') || '';
  const size = url.searchParams.get('size') || '10';
  const page = url.searchParams.get('page') || '1';
  const orderby = url.searchParams.get('orderby') || 'product_name';
  const sort = url.searchParams.get('sort') || 'asc';

  return { keyword, type, size, page, orderby, sort };
}
