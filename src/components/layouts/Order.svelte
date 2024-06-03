<script lang="ts">
  export let cart: Array<{ product_thumbnail_url: string | null; product_name: string; product_price: number }>;
</script>

<div>
  {#if cart.length > 0}
    <ul>
      {#each cart as { product_name, product_price, product_thumbnail_url }, index (index)}
        <li class="flex items-center justify-between p-2">
          <img src={product_thumbnail_url} alt={product_name} class="h-20 w-20 object-cover" />
          <div>
            <p>{product_name}</p>
            <p>{product_price}원</p>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <p>장바구니가 비어 있습니다.</p>
  {/if}
</div>
