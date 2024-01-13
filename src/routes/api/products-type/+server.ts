import * as ProductModules from '$lib/server/modules/products';
import responseJson from '$lib/server/utils/reponse';

export async function GET() {
  const productType = await ProductModules.getProductType();
  return responseJson({
    jsonData: productType,
    jsonDataKey: 'productType',
    message: '상품 유형 조회 성공',
    status: 200,
  });
}
