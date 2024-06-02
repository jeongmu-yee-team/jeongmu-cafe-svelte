<script lang="ts">
  import type { TProducts } from '$src/lib/server/modules/products';

  export let className: string = '';
  export let selectedProducts: TProducts;
  let quantity: number;

  function increaseQuantity(productId: number) {}

  function decreaseQuantity(productId: number) {}
</script>

<div class={className}>
  <div class="product-list grid grid-flow-col grid-cols-4">
    {#each selectedProducts as product}
      <div>
        <img src={product.product_thumbnail_url} alt="상품이미지" />
        {product.product_name} - {product.product_price}원
        <div>수량: {quantity}</div>
        <button>+</button>
        <button>-</button>
      </div>
    {/each}
  </div>
</div>
