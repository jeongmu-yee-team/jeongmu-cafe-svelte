import * as ProductModules from '$lib/server/modules/products';
import responseJson from '$lib/server/utils/reponse';

export async function GET() {
  const { products, totalCount } = await ProductModules.getProducts();
  return responseJson({
    jsonData: { products, totalCount },
    jsonDataKey: 'productsWithCount',
    message: '상품 목록 조회 성공',
    status: 200,
  });
}

export async function POST() {}
