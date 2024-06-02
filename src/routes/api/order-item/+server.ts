import * as ProductModules from '$lib/server/modules/order';
import responseJson from '$lib/server/utils/reponse';

export async function GET() {
  const odrderItem = await ProductModules.getOrderItem();
  return responseJson({
    jsonData: odrderItem,
    jsonDataKey: 'orderItem',
    message: '상품 테이블 목록 조회 성공',
    status: 200,
  });
}
