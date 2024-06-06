<script lang="ts">
  export let cart: Array<{
    product_thumbnail_url: string | null;
    product_name: string;
    product_price: number;
    quantity: number;
  }>;
</script>

<div class="max-h-96 overflow-y-auto">
  {#if cart.length > 0}
    <ul>
      {#each cart as { product_name, product_price, product_thumbnail_url, quantity }, index (index)}
        <li class="flex items-center justify-between p-2">
          <img src={product_thumbnail_url} alt={product_name} class="h-20 w-20 object-cover" />
          <div>
            <p>{product_name}</p>
            <p>{product_price}원</p>
            <p>수량: {quantity}</p>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <p>장바구니가 비어 있습니다.</p>
  {/if}
</div>
