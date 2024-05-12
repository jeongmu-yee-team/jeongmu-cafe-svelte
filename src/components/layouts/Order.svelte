<script lang="ts">
  import type { TProducts } from '$src/lib/server/modules/products';

  export let className: string = '';
  export let orderProductsData: TProducts;
</script>

<div class={className}>
  <div class="product-list grid grid-flow-col grid-cols-4">
    {#each orderProductsData as item}
      <div>
        <img src={item.product_thumbnail_url} alt="상품 이미지" />
        <p>{item.product_name}</p>
        <p>{item.product_price}원</p>
      </div>
    {/each}
  </div>
</div>
