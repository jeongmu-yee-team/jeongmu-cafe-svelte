export interface ICartItem {
  product_name: string;
  product_thumbnail_url: string | null;
  product_price: number;
  product_type_id: number | null;
  quantity: number;
}
